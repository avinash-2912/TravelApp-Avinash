import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://travelapp-avinash.onrender.com/api',
});

// Interceptor to add Authorization token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = (email, password) => api.post('/auth/login', { email, password });

export const signup = (name, email, password, role) =>
  api.post('/auth/signup', { name, email, password, role });

// Trips API
export const getTrips = () => api.get('/trips');
export const getTripById = (id) => api.get(`/trips/${id}`);
export const createTrip = (tripData) => api.post('/trips', tripData);
export const updateTrip = (id, tripData) => api.put(`/trips/${id}`, tripData);
export const deleteTrip = (id) => api.delete(`/trips/${id}`);

// Bookings API
export const getBookings = () => api.get('/bookings');
export const createBooking = (tripId, count) => api.post('/bookings', { tripId, count }); // Updated to include count
export const cancelBooking = async(id, tripId, count) => {
  await api.delete(`/bookings/${id}`);
  // Increase trip capacity after cancellation
  return api.patch(`/trips/${tripId}/increaseCapacity`, { count });
};
