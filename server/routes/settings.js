const express = require('express')
const SiteSettings = require('../models/SiteSettings')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const settings = await SiteSettings.find()
    const result = {}
    settings.forEach(s => result[s.key] = s.value)
    res.json(result)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const { key, value } = req.body
    await SiteSettings.findOneAndUpdate({ key }, { value }, { upsert: true, new: true })
    res.json({ message: 'Saved' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router