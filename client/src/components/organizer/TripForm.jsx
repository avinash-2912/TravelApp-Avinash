import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TripForm = ({ selectedTrip, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    duration: '',
    location: '',
    startDate: '',
    endDate: '',
    capacity: '',
  });

  // Populate formData if editing an existing trip
  useEffect(() => {
    if (selectedTrip) {
      const { title, description, image, price, duration, location, startDate, endDate, capacity } =
        selectedTrip;
      setFormData({
        title,
        description,
        image,
        price,
        duration,
        location,
        startDate: startDate.split('T')[0], // Format date if necessary
        endDate: endDate.split('T')[0], // Format date if necessary
        capacity,
      });
    }
  }, [selectedTrip]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center">
        {selectedTrip ? 'Edit Trip' : 'Create a New Trip'}
      </h2>

      {Object.keys(formData).map((field) => (
        <div className="mb-4" key={field}>
          <label htmlFor={field} className="block mb-1 font-semibold capitalize">
            {field.replace(/([A-Z])/g, ' $1')}
          </label>
          <input
            type={field.includes('Date') ? 'date' : field === 'description' ? 'textarea' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
      ))}

      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          {selectedTrip ? 'Update Trip' : 'Save Trip'}
        </button>
      </div>
    </form>
  );
};

export default TripForm;
