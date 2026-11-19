const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['domestic', 'international', 'hajj-umrah'], required: true },
  region: { type: String },
  continent: { type: String },
  image: { type: String },
  days: { type: String },
  price: { type: String },
  description: { type: String },
  includes: [String],
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Tour', tourSchema)