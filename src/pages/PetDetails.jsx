import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import petData from '../data/pets.json';

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find pet by ID
  const pet = petData.find(p => p.id === parseInt(id));

  if (!pet) {
    return (
      <div className="text-center mt-10 px-4">
        <h2 className="text-2xl font-bold">Pet not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-teal-600 underline"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white px-4 py-6 rounded-lg shadow-md mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full md:w-1/2 h-64 object-cover rounded"
        />
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{pet.name}</h2>
          <div className="space-y-1 text-gray-700 text-sm sm:text-base">
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Type:</strong> {pet.type}</p>
            <p><strong>Age:</strong> {pet.age}</p>
            <p><strong>Gender:</strong> {pet.gender}</p>
            <p><strong>Location:</strong> {pet.location}</p>
          </div>

          <button
            onClick={() => navigate(`/adopt/${pet.id}`)}
            className="mt-6 bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
          >
            🐾 Adopt Me
          </button>
        </div>
      </div>
    </div>
  );
}
