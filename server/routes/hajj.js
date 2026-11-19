const express = require('express')
const HajjPackage = require('../models/HajjPackage')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const packages = await HajjPackage.find({ isActive: true }).sort({ createdAt: -1 })
    res.json(packages)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const pkg = new HajjPackage(req.body)
    await pkg.save()
    res.status(201).json(pkg)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const pkg = await HajjPackage.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(pkg)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await HajjPackage.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router