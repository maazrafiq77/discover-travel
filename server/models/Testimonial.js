const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  rating: { type: Number, default: 5 },
  text: { type: String },
  textUr: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Testimonial', testimonialSchema)