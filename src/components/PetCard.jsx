import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PetCard({ pet, onFavoriteToggle }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(pet.id));
  }, [pet.id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(pet.id)) {
      favorites = favorites.filter(id => id !== pet.id);
    } else {
      favorites.push(pet.id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
    
    // Notify parent of change
    if (onFavoriteToggle) {
      onFavoriteToggle(pet.id, !isFavorite);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition w-full sm:w-[300px] relative">
      {/* Favorite Toggle Button */}
      <button
        onClick={toggleFavorite}
        className={`absolute top-2 right-2 text-2xl ${
          isFavorite ? 'text-red-500' : 'text-gray-300'
        } hover:scale-110 transition duration-200`}
        title="Toggle Favorite"
      >
        ❤️
      </button>

      {/* Pet Image */}
      <img
        src={pet.image}
        alt={pet.name}
        className="w-full h-48 object-cover"
      />

      {/* Pet Info */}
      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-semibold">{pet.name}</h3>
        <p className="text-gray-600 text-sm sm:text-base">{pet.breed}</p>
        <p className="text-sm text-gray-500">
          {pet.age} • {pet.gender}
        </p>
        <p className="text-sm text-gray-500">📍 {pet.location}</p>
        <Link
          to={`/pets/${pet.id}`}
          className="inline-block mt-3 text-teal-600 hover:underline font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
