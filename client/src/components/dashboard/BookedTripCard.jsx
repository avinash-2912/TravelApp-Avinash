import React from 'react';
import { Calendar, MapPin, X } from 'lucide-react';
import * as api from '../../lib/api';

export function BookedTripCard({ booking, onCancel }) {
  const handleCancel = async () => {
    const isConfirmed = window.confirm('Are you sure you want to cancel this booking?');
    if (!isConfirmed) return;

    try {
      await api.cancelBooking(booking._id, booking.tripId._id, booking.count); // Updated call
      onCancel(booking._id);
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking. Please try again later.');
    }
  };

  console.log(booking)

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start">
        <div>
          <img src={booking.tripId.image} alt={booking.tripId.title} className="h-32 w-full object-cover rounded-md mb-2" />
          <h3 className="text-lg font-semibold">{booking.tripId.title}</h3>
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <MapPin size={16} />
            <span>{booking.tripId.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <Calendar size={16} />
            <span>{new Date(booking.tripId.startDate).toLocaleDateString()}</span>
          </div>
          <p className="mt-2 text-gray-600">Number of Persons: {booking.count}</p>
          <p className="mt-1 text-lg font-semibold text-green-500">
            Total Price: ${booking.tripId.price * booking.count}
          </p>
        </div>
        {booking.status === 'confirmed' && ( // Only show cancel button for confirmed bookings
          <button
            onClick={handleCancel}
            className="text-red-500 hover:text-red-700"
            title="Cancel booking"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
