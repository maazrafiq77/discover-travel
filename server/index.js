const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://discovertraveltours.vercel.app',
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
}))

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/tours', require('./routes/tours'))
app.use('/api/enquiries', require('./routes/enquiries'))
app.use('/api/chat', require('./routes/chat'))
app.use('/api/hajj', require('./routes/hajj'))
app.use('/api/visa', require('./routes/visa'))
app.use('/api/testimonials', require('./routes/testimonials'))
app.use('/api/settings', require('./routes/settings'))

app.get('/', (req, res) => res.json({ status: 'Discover Travel API running' }))


const PORT = process.env.PORT || 5000
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

module.exports = app

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB Connected')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message)
    process.exit(1)
  }
}

startServer()
