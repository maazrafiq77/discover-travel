const express = require('express')
const Visa = require('../models/Visa')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const visas = await Visa.find({ isActive: true }).sort({ createdAt: -1 })
    res.json(visas)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const visa = new Visa(req.body)
    await visa.save()
    res.status(201).json(visa)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const visa = await Visa.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(visa)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Visa.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router