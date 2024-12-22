import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { Calendar, MapPin, Edit, Trash } from 'lucide-react';

export function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingCount, setBookingCount] = useState(1);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('userId');
    if (storedRole) setRole(storedRole);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await api.get(`/trips/${id}`);
        setTrip(response.data);
      } catch (error) {
        console.error('Failed to fetch trip details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/trips/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/trips/${id}`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to delete trip:', error);
    }
  };

  const handleBooking = async () => {
    if (trip.capacity < bookingCount) {
      alert('Not enough spots available.');
      return;
    }
    try {
      await api.post('/bookings', { tripId: id, count: bookingCount });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to book trip:', error);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  const isOrganizer = role === 'organizer' && userId === trip.organizerId;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800">{trip.title}</h2>
      <img src={trip.image} alt={trip.title} className="w-full h-64 object-cover rounded-lg mt-4 shadow-md" />
      <div className="flex items-center mt-4 text-gray-700">
        <MapPin size={20} />
        <span className="ml-2">{trip.location}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-700">
        <Calendar size={20} />
        <span className="ml-2">{new Date(trip.startDate).toLocaleDateString()}</span>
      </div>
      <div className="mt-4">
        <p className="text-gray-600">{trip.description}</p>
        <p className="mt-2 text-lg font-semibold">Price: <span className="text-green-500">${trip.price}</span></p>
        <p className="text-gray-600">Available spots: <span className="font-bold">{trip.capacity}</span></p>
      </div>
      {isOrganizer ? (
        <div className="mt-6 flex space-x-4">
          <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-300">
            <Edit size={16} /> Edit Trip
          </button>
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition duration-300">
            <Trash size={16} /> Delete Trip
          </button>
        </div>
      ) : (
        role === 'user' && (
          <div className="mt-6">
            <label htmlFor="bookingCount" className="block mb-2 text-gray-700 font-semibold">Number of Persons:</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="bookingCount"
                value={bookingCount}
                min="1"
                max={trip.capacity}
                onChange={(e) => setBookingCount(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-1/4"
              />
              <button onClick={handleBooking} className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition duration-300">
                Book Trip
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
