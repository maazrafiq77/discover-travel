const express = require('express')
const { GoogleGenAI } = require('@google/genai')
const ChatSession = require('../models/ChatSession')
const Tour = require('../models/Tour')
const HajjPackage = require('../models/HajjPackage')
const auth = require('../middleware/auth')

const router = express.Router()

// Initialize Gemini
const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

// Get all chat sessions (admin)
router.get('/', auth, async (req, res) => {
  try {
    const sessions = await ChatSession.find().sort({ createdAt: -1 })
    res.json(sessions)
  } catch (err) {
    console.log('Session error:', err.message)
    res.status(500).json({ message: 'Server error' })
  }
})

// Send message to AI (Streaming)
router.post('/message', async (req, res) => {
  try {
    const { messages, sessionId } = req.body

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'Messages are required' })
    }

    // Load active tours and Hajj packages (.lean() makes queries 10x faster)
    const tours = await Tour.find({ isActive: true }).lean()
    const hajjPackages = await HajjPackage.find({ isActive: true }).lean()

    const toursText = tours.map(t =>
      `- ${t.title} (${t.type}): ${t.price}, ${t.days}${t.region ? ', Region: ' + t.region : ''}${t.continent ? ', Continent: ' + t.continent : ''}`
    ).join('\n')

    const hajjText = hajjPackages.map(p =>
      `- ${p.title}: ${p.price}, ${p.days}, Includes: ${(p.includes || []).join(', ')}`
    ).join('\n')

    const systemPrompt = `You are a friendly and helpful travel assistant for Discover Travel & Tours, a travel agency based in Peshawar, Pakistan.

Your job is to:
1. Answer questions about tours, Hajj & Umrah, visas, flights and hotels.
2. Collect customer information when they want to book.
3. Help customers find the right package.
4. Help customers complete booking enquiries.
5. Encourage customers to enquire via WhatsApp: +92 343 934 3482.

Available Domestic Tours:
${toursText || 'No tours listed yet. Tell the customer to WhatsApp us.'}

Hajj & Umrah Packages:
${hajjText || 'No packages listed yet. Tell the customer to WhatsApp us.'}

Important rules:
- Always respond to greetings such as hi, hello, Assalam o Alaikum and salam.
- Be warm, friendly and professional.
- Respond in the same language the customer uses (English or Urdu).
- Keep responses short and clear (2-4 sentences maximum).
- Never invent package prices or booking details.
- WhatsApp number: +92 343 934 3482.
- Office: Deans Trade Center, Saddar Cantt, Peshawar.
`

    // Convert chat history into Gemini format
    const contents = messages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(m.content || '') }]
      }))
      .filter(m => m.parts[0].text.trim() !== '')

    if (contents.length === 0) {
      return res.status(400).json({ message: 'No valid messages found' })
    }

    // Set headers for Server-Sent Events (SSE)
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    // Generate AI response using Gemini 1.5 Flash (Fastest model)
    const stream = await client.models.generateContentStream({
      model: 'gemini-1.5-flash',
      contents,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 1000
      }
    })

    let fullReply = ''

    // Stream chunks to frontend
    for await (const chunk of stream) {
      const text = chunk.text
      if (text) {
        fullReply += text
        res.write(`data: ${JSON.stringify({ text })}\n\n`)
      }
    }

    // End the stream
    res.write('data: [DONE]\n\n')
    res.end()

    // Save to database in the background (don't block the response)
    if (sessionId) {
      ChatSession.findByIdAndUpdate(sessionId, {
        $push: {
          messages: {
            $each: [
              { role: 'user', content: messages[messages.length - 1].content },
              { role: 'assistant', content: fullReply }
            ]
          }
        }
      }).catch(err => console.log('DB Save Error:', err.message))
    }

  } catch (err) {
    console.error('Chat error:', err)
    if (!res.headersSent) {
      res.status(500).json({ message: 'Server error' })
    } else {
      res.write(`data: ${JSON.stringify({ text: '\n\nError connecting to AI.' })}\n\n`)
      res.end()
    }
  }
})

// Create new session
router.post('/session', async (req, res) => {
  try {
    const session = new ChatSession(req.body)
    await session.save()
    res.status(201).json(session)
  } catch (err) {
    console.log('Create session error:', err.message)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update session
router.put('/session/:id', async (req, res) => {
  try {
    const session = await ChatSession.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(session)
  } catch (err) {
    console.log('Update session error:', err.message)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router;