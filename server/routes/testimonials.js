const express = require('express')
const Testimonial = require('../models/Testimonial')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 })
    res.json(testimonials)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const t = new Testimonial(req.body)
    await t.save()
    res.status(201).json(t)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(t)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router