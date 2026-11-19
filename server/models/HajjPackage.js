const mongoose = require('mongoose')

const hajjPackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String },
  days: { type: String },
  includes: [String],
  isPopular: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('HajjPackage', hajjPackageSchema)