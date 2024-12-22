import { useState, useEffect } from 'react';
import * as api from '../lib/api';

export function useTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.getTrips();
        setTrips(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching trips:', err);
        setError(err.response?.data?.message || 'Failed to load trips');
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return { trips, loading, error };
}
