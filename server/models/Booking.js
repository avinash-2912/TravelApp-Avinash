const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  count: { // New field to hold the number of spots booked
    type: Number,
    required: true,
    min: 1 // Ensures at least one spot must be booked
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  bookingDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
