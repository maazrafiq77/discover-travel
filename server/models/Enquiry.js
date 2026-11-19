const mongoose = require('mongoose')

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  subject: { type: String },
  message: { type: String },
  destination: { type: String },
  travelDate: { type: String },
  travellers: { type: String },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true })

module.exports = mongoose.model('Enquiry', enquirySchema)