const express = require('express')
const Enquiry = require('../models/Enquiry')
const auth = require('../middleware/auth')
const router = express.Router()

// Submit enquiry (public)
router.post('/', async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body)
    await enquiry.save()
    res.status(201).json({ message: 'Enquiry submitted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get all enquiries (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 })
    res.json(enquiries)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Update enquiry status (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(enquiry)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete enquiry (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router