const mongoose = require('mongoose')

const siteSettingsSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true })

module.exports = mongoose.model('SiteSettings', siteSettingsSchema)