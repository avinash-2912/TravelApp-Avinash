import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { BookedTripCard } from '../components/dashboard/BookedTripCard';

export function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings');
        // Filter bookings to only include confirmed ones
        const confirmedBookings = response.data.filter(booking => booking.status === 'confirmed');
        setBookings(confirmedBookings);
        setError(null);
      } catch (err) {
        setError('Failed to load bookings');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = (bookingId) => {
    // Filter out the cancelled booking from the state
    setBookings(bookings.filter(booking => booking._id !== bookingId));
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map(booking => (
          <BookedTripCard
            key={booking._id}
            booking={booking}
            onCancel={handleCancelBooking}
          />
        ))}
      </div>
      {bookings.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No bookings found</p>
      )}
    </div>
  );
}
