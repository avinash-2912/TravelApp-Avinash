const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const { auth, isOrganizer } = require('../middleware/auth');

// Public routes
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().populate('organizerId', 'name');
    res.json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate('organizerId', 'name');
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Organizer routes
router.post('/', [auth, isOrganizer], async (req, res) => {
  const { title, description, image, price, duration, location, startDate, endDate, capacity } = req.body;

  // Validate required fields
  if (!title || !description || !image || !price || !duration || !location || !startDate || !endDate || !capacity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const trip = new Trip({
      title,
      description,
      image,
      price,
      duration,
      location,
      startDate,
      endDate,
      capacity,
      organizerId: req.user.userId // Ensure the organizerId is set correctly
    });
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    console.error('Error saving trip:', error);
    res.status(500).json({ message: 'Failed to save trip', error: error.message });
  }
});

router.put('/:id', [auth, isOrganizer], async (req, res) => {
  const { title, description, image, price, duration, location, startDate, endDate, capacity } = req.body;

  // Validate required fields
  if (!title || !description || !image || !price || !duration || !location || !startDate || !endDate || !capacity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, organizerId: req.user.userId },
      { title, description, image, price, duration, location, startDate, endDate, capacity },
      { new: true }
    );
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', [auth, isOrganizer], async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      organizerId: req.user.userId
    });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:tripId/increaseCapacity', [auth], async (req, res) => {
  const { count } = req.body;
  const { tripId } = req.params;

  if (!count || count <= 0) {
    return res.status(400).json({ message: 'Invalid count for capacity increase' });
  }

  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Increase capacity
    trip.capacity += count; // Adjust capacity as needed
    await trip.save();

    res.status(200).json({ message: 'Trip capacity updated successfully' });
  } catch (error) {
    console.error('Error updating trip capacity:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
