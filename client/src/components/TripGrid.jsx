import React from "react";
import { TripCard } from "./TripCard";

export function TripGrid({ trips, isOrganizer, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <TripCard 
          key={trip._id} 
          trip={trip} 
          isOrganizer={isOrganizer} // Pass the isOrganizer prop
          onEdit={onEdit} // Pass edit function
          onDelete={onDelete} // Pass delete function
        />
      ))}
    </div>
  );
}
