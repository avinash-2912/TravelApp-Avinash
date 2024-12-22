const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const { auth } = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { tripId, count } = req.body; // Destructure tripId and count from request body
    const trip = await Trip.findById(tripId);
    
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Check if enough capacity is available
    if (trip.capacity < count) {
      return res.status(400).json({ message: 'Not enough capacity available for the booking' });
    }

    // Create booking
    const booking = new Booking({
      tripId,
      userId: req.user.userId,
      count, // Include count in the booking
      status: 'confirmed'
    });
    
    await booking.save();

    // Update trip capacity
    trip.capacity -= count; // Decrease capacity by the number of spots booked
    await trip.save();
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId })
      .populate('tripId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { status: 'cancelled' },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
