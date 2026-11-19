const mongoose = require('mongoose')

const visaSchema = new mongoose.Schema({
  country: { type: String, required: true },
  flag: { type: String },
  type: { type: String },
  processing: { type: String },
  fee: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Visa', visaSchema)