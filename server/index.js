const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({
  origin: '*',
  credentials: true,
}))
app.use(express.json())

// Cache mongoose connection for serverless
let isConnected = false

const connectDB = async () => {
  if (isConnected) return
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true
    console.log('MongoDB Connected')
  } catch (err) {
    console.log('MongoDB Error:', err.message)
  }
}

// Connect before every request
app.use(async (req, res, next) => {
  await connectDB()
  next()
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/tours', require('./routes/tours'))
app.use('/api/enquiries', require('./routes/enquiries'))
app.use('/api/chat', require('./routes/chat'))
app.use('/api/hajj', require('./routes/hajj'))
app.use('/api/visa', require('./routes/visa'))
app.use('/api/testimonials', require('./routes/testimonials'))
app.use('/api/settings', require('./routes/settings'))

app.get('/', (req, res) => res.json({ status: 'Discover Travel API running' }))

module.exports = app