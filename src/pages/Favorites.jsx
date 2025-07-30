import React, { useEffect, useState } from 'react';
import PetCard from '../components/PetCard';
import petData from '../data/pets.json';

export default function Favorites() {
  const [favoritePets, setFavoritePets] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const matched = petData.filter(pet => favorites.includes(pet.id));
    setFavoritePets(matched);
  }, []);

  // Remove pet from favorites immediately on toggle
  const handleFavoriteToggle = (petId, isNowFavorite) => {
    if (!isNowFavorite) {
      setFavoritePets(prev => prev.filter(pet => pet.id !== petId));
    } else {
      // Optional: Add back pet if needed (not typical here)
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        ❤️ Your Favorite Pets
      </h2>

      {favoritePets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {favoritePets.map(pet => (
            <PetCard key={pet.id} pet={pet} onFavoriteToggle={handleFavoriteToggle} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-base sm:text-lg mt-8">
          You haven't favorited any pets yet.
        </p>
      )}
    </div>
  );
}
