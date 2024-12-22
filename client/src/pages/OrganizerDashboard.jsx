import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { api } from "../lib/api";
import TripForm from "../components/organizer/TripForm";
import { TripGrid } from "../components/TripGrid";

export function OrganizerDashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  // Fetch trips data
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get("/trips");
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found in local storage.");
        }
        const organizerTrips = response.data.filter(
          (trip) => trip.organizerId._id === userId
        );
        setTrips(organizerTrips);
      } catch (err) {
        setError("Failed to load trips. Please try again later.");
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  // Handle form submission for adding or editing trips
  const handleSubmit = async (formData) => {
    try {
      if (editingTrip) {
        // Update existing trip
        const response = await api.put(`/trips/${editingTrip._id}`, formData);
        setTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip._id === editingTrip._id ? response.data : trip
          )
        );
      } else {
        // Create new trip
        const response = await api.post("/trips", formData);
        setTrips((prevTrips) => [...prevTrips, response.data]);
      }
      setShowForm(false);
      setEditingTrip(null);
    } catch (err) {
      console.error("Failed to save trip:", err);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await api.delete(`/trips/${tripId}`);
      setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== tripId));
    } catch (err) {
      console.error("Failed to delete trip:", err);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingTrip(null);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus size={20} />
          Add New Trip
        </button>
      </div>

      {showForm && (
  <div className="mb-8 bg-white p-6 rounded-lg shadow">
    <TripForm
      selectedTrip={editingTrip}
      onSave={(formData) => {
        handleSubmit(formData); // Pass data for saving
      }}
      onCancel={() => {
        setShowForm(false);
        setEditingTrip(null);
      }}
    />
  </div>
)}

      <TripGrid
        trips={trips}
        isOrganizer
        onEdit={(trip) => {
          setEditingTrip(trip);
          setShowForm(true);
        }}
        onDelete={handleDeleteTrip}
      />

      {trips.length === 0 && !showForm && (
        <p className="text-center text-gray-500">No trips found. Create a new one!</p>
      )}
    </div>
  );
}
