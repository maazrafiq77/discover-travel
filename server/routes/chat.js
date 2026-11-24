const express = require('express')
const { GoogleGenAI } = require('@google/genai')
const ChatSession = require('../models/ChatSession')
const Tour = require('../models/Tour')
const HajjPackage = require('../models/HajjPackage')
const auth = require('../middleware/auth')

const router = express.Router()

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

// Build system prompt
const buildPrompt = (tours, hajjPackages) => {
  const toursText = tours.map(t =>
    `- ${t.title} (${t.type}): ${t.price}, ${t.days}${t.region ? ', ' + t.region : ''}${t.continent ? ', ' + t.continent : ''}`
  ).join('\n')

  const hajjText = hajjPackages.map(p =>
    `- ${p.title}: ${p.price}, ${p.days}, Includes: ${(p.includes || []).join(', ')}`
  ).join('\n')

  return `You are a friendly travel assistant for Discover Travel & Tours, Peshawar, Pakistan.

Available Tours:
${toursText || 'No tours yet. Tell customer to WhatsApp us.'}

Hajj & Umrah Packages:
${hajjText || 'No packages yet. Tell customer to WhatsApp us.'}

Rules:
- Greet warmly. Respond in customer's language (English or Urdu).
- Keep replies short (2-4 sentences max).
- Never invent prices or packages not listed above.
- Collect name and phone when customer wants to book.
- WhatsApp: +92 343 934 3482
- Office: Deans Trade Center, Saddar Cantt, Peshawar.
- Always show phone number exactly as +92 343 934 3482.`
}

// Get all chat sessions (admin)
router.get('/', auth, async (req, res) => {
  try {
    const sessions = await ChatSession.find().sort({ createdAt: -1 })
    res.json(sessions)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// STREAMING message route — fast response
router.post('/stream', async (req, res) => {
  try {
    const { messages, sessionId } = req.body

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'Messages required' })
    }

    // Load data with limited fields for speed
    const tours = await Tour.find({ isActive: true }).select('title type price days region continent').limit(10)
    const hajjPackages = await HajjPackage.find({ isActive: true }).select('title price days includes').limit(5)

    const systemPrompt = buildPrompt(tours, hajjPackages)

    const contents = messages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(m.content || '') }]
      }))
      .filter(m => m.parts[0].text.trim() !== '')

    if (contents.length === 0) {
      return res.status(400).json({ message: 'No valid messages' })
    }

    // Set streaming headers
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.flushHeaders()

    // Stream response
    const stream = await client.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 300,
        temperature: 0.7,
      }
    })

    let fullReply = ''

    for await (const chunk of stream) {
      const text = chunk.text
      if (text) {
        fullReply += text
        res.write(`data: ${JSON.stringify({ text })}\n\n`)
      }
    }

    res.write('data: [DONE]\n\n')
    res.end()

    // Save to session in background
    if (sessionId && fullReply) {
      ChatSession.findByIdAndUpdate(sessionId, {
        $push: {
          messages: {
            $each: [
              { role: 'user', content: messages[messages.length - 1].content },
              { role: 'assistant', content: fullReply }
            ]
          }
        }
      }).catch(() => {})
    }

  } catch (err) {
    console.error('Stream error:', err.message)
    res.write(`data: ${JSON.stringify({ error: 'Error getting response' })}\n\n`)
    res.write('data: [DONE]\n\n')
    res.end()
  }
})

// Regular message route (kept as fallback)
router.post('/message', async (req, res) => {
  try {
    const { messages, sessionId } = req.body

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'Messages required' })
    }

    const tours = await Tour.find({ isActive: true }).select('title type price days region continent').limit(10)
    const hajjPackages = await HajjPackage.find({ isActive: true }).select('title price days includes').limit(5)

    const systemPrompt = buildPrompt(tours, hajjPackages)

    const contents = messages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(m.content || '') }]
      }))
      .filter(m => m.parts[0].text.trim() !== '')

    if (contents.length === 0) {
      return res.status(400).json({ message: 'No valid messages' })
    }

    let response
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await client.models.generateContent({
          model: 'gemini-2.0-flash',
          contents,
          config: {
            systemInstruction: systemPrompt,
            maxOutputTokens: 300,
            temperature: 0.7,
          }
        })
        break
      } catch (err) {
        if (err.status !== 503 || attempt === 3) throw err
        await new Promise(resolve => setTimeout(resolve, attempt * 2000))
      }
    }

    const reply = response.text

    if (sessionId) {
      await ChatSession.findByIdAndUpdate(sessionId, {
        $push: {
          messages: {
            $each: [
              { role: 'user', content: messages[messages.length - 1].content },
              { role: 'assistant', content: reply }
            ]
          }
        }
      })
    }

    res.json({ reply })

  } catch (err) {
    console.error('Chat error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create session
router.post('/session', async (req, res) => {
  try {
    const session = new ChatSession(req.body)
    await session.save()
    res.status(201).json(session)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Update session
router.put('/session/:id', async (req, res) => {
  try {
    const session = await ChatSession.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(session)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router