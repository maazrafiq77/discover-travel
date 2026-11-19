const express = require('express')
const Tour = require('../models/Tour')
const auth = require('../middleware/auth')
const router = express.Router()

// Get all tours (public)
router.get('/', async (req, res) => {
  try {
    const { type } = req.query
    const filter = { isActive: true }
    if (type) filter.type = type
    const tours = await Tour.find(filter).sort({ createdAt: -1 })
    res.json(tours)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single tour (public)
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    if (!tour) return res.status(404).json({ message: 'Tour not found' })
    res.json(tour)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Create tour (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const tour = new Tour(req.body)
    await tour.save()
    res.status(201).json(tour)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Update tour (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(tour)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete tour (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
    res.json({ message: 'Tour deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router