import React, { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { TripGrid } from '../components/TripGrid';
import { useTrips } from '../hooks/useTrips';

export function HomePage() {
  const { trips, loading, error } = useTrips();
  const [search, setSearch] = useState('');

  const filteredTrips = useMemo(() => {
    return trips.filter(trip =>
      trip?.title?.toLowerCase().includes(search.toLowerCase()) ||
      trip?.location?.toLowerCase().includes(search.toLowerCase())
    );
  }, [trips, search]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-gray-600">
            Explore handpicked destinations and create unforgettable memories
          </p>
        </div>

        <SearchBar value={search} onChange={setSearch} />

        {loading ? (
          <div className="text-center">Loading trips...</div>
        ) : (
          <TripGrid trips={filteredTrips} />
        )}
      </div>
    </div>
  );
}