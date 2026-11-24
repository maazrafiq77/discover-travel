
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

// Send message to AI
router.post('/message', async (req, res) => {
  try {
    const { messages, sessionId } = req.body

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        message: 'Messages are required'
      })
    }

    // Load active tours and Hajj packages
    const tours = await Tour.find({ isActive: true })
    const hajjPackages = await HajjPackage.find({ isActive: true })

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
- For greetings, introduce yourself as the Discover Travel & Tours assistant.
- Be warm, friendly and professional.
- Respond in the same language the customer uses (English or Urdu).
- Keep responses short and clear (2-4 sentences maximum).
- Answer general questions about Umrah, Hajj, visas, flights and hotels.
- Never invent package prices or booking details.
- When a customer wants to book, collect their information one question at a time.
- Collect customer name and phone number.
- Collect destination, travel date, number of travellers and preferred package.
- Ask only for information that the customer has not already provided.
- Do not claim that a booking or enquiry has been saved.
- Before completing an enquiry, summarize all collected details and ask the customer to confirm.
- If information is missing, ask for it instead of assuming.
- Always provide a helpful answer before suggesting WhatsApp.
- WhatsApp number: +92 343 934 3482.
- Office: Deans Trade Center, Saddar Cantt, Peshawar.
- Never make up prices or packages not listed above.
- Always display the WhatsApp number exactly as +92 343 934 3482.
- Never reverse, rearrange or change the phone number.
- In Urdu responses, keep the phone number in English digits.
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
      return res.status(400).json({
        message: 'No valid messages found'
      })
    }

    // Generate AI response using Gemini
    let response

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await client.models.generateContent({
          model: 'gemini-3.5-flash',
          contents,
          config: {
            systemInstruction: systemPrompt,
            thinkingConfig: {
              thinkingLevel: 'low'
            },
            maxOutputTokens: 1000
          }
        })

        break
      } catch (err) {
        if (err.status !== 503 || attempt === 3) {
          throw err
        }

        console.log(`Gemini busy. Retry ${attempt}/3...`)

        await new Promise(resolve =>
          setTimeout(resolve, attempt * 2000)
        )
      }
    }

    const reply = response.text

    // Update session if it exists
    if (sessionId) {
      await ChatSession.findByIdAndUpdate(sessionId, {
        $push: {
          messages: {
            $each: [
              {
                role: 'user',
                content: messages[messages.length - 1].content
              },
              {
                role: 'assistant',
                content: reply
              }
            ]
          }
        }
      })
    }

    res.json({ reply })

  } catch (err) {
    console.error('Chat error:', err)
    res.status(500).json({
      message: 'Server error'
    })
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
    const session = await ChatSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(session)
  } catch (err) {
    console.log('Update session error:', err.message)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router;