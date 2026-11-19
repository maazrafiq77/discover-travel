const express = require('express')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' })
    const match = await admin.matchPassword(password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, email: admin.email })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/setup', async (req, res) => {
  try {
    console.log('Setup hit, body:', req.body)
    const existing = await Admin.findOne({})
    console.log('Existing admin:', existing)
    if (existing) return res.status(400).json({ message: 'Admin already exists' })
    const admin = new Admin({ email: req.body.email, password: req.body.password })
    await admin.save()
    res.json({ message: 'Admin created successfully' })
  } catch (err) {
    console.log('Setup error:', err.message)
    res.status(500).json({ message: err.message })
  }
})

module.exports = router