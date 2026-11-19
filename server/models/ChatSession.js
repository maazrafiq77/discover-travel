
const mongoose = require('mongoose')

const chatSessionSchema = new mongoose.Schema({
  customerName: {
    type: String,
    trim: true
  },

  customerPhone: {
    type: String,
    trim: true
  },

  booking: {
    destination: {
      type: String,
      default: ''
    },

    travelDate: {
      type: String,
      default: ''
    },

    travellers: {
      type: Number,
      default: null
    },

    packageName: {
      type: String,
      default: ''
    },

    bookingType: {
      type: String,
      enum: ['Umrah', 'Hajj', 'Tour', 'Flight', 'Hotel', 'Visa', 'Other'],
      default: 'Other'
    },

    confirmed: {
      type: Boolean,
      default: false
    }
  },

  messages: [
    {
      role: {
        type: String,
        enum: ['user', 'assistant']
      },

      content: {
        type: String
      },

      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],

  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  },

  enquiryStatus: {
    type: String,
    enum: ['New', 'Contacted', 'Confirmed', 'Cancelled'],
    default: 'New'
  }

}, { timestamps: true })

module.exports = mongoose.model('ChatSession', chatSessionSchema)
