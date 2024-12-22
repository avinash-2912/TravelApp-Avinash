import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Edit, Trash } from "lucide-react";

export function TripCard({ trip, isOrganizer, onEdit, onDelete }) {
  const handleButtonClick = (e, action) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    action();
  };

  return (
    <div className="group">
      <Link to={`/trips/${trip._id}`} className="block">
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-[1.02]">
          <div className="relative h-48">
            <img
              src={trip.image}
              alt={trip.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h3 className="text-white text-xl font-semibold">{trip.title}</h3>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPin size={18} />
              <span>{trip.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Calendar size={18} />
              <span>{new Date(trip.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Clock size={18} />
              <span>{trip.duration} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-indigo-600">
                ${trip.price}
              </span>
              <span className="text-sm text-gray-500">
                {trip.capacity} spots left
              </span>
            </div>
            {isOrganizer && (
              <div className="flex justify-between mt-4">
                <button
                  onClick={(e) => handleButtonClick(e, () => onEdit(trip))}
                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  <Edit size={16} className="mr-1" /> Edit
                </button>
                <button
                  onClick={(e) => handleButtonClick(e, () => onDelete(trip._id))}
                  className="text-red-600 hover:text-red-800 flex items-center"
                >
                  <Trash size={16} className="mr-1" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
