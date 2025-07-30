import React, { useEffect, useState } from 'react';
import PetCard from '../components/PetCard';
import petData from '../data/pets.json';

export default function PetList() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    gender: '',
    location: '',
    search: ''
  });

  useEffect(() => {
    setPets(petData);
  }, []);

  const handleChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const filteredPets = pets.filter(pet => {
    const matchType = filters.type ? pet.type === filters.type : true;
    const matchGender = filters.gender ? pet.gender === filters.gender : true;
    const matchLocation = filters.location
      ? pet.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    const matchSearch = filters.search
      ? pet.name.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    return matchType && matchGender && matchLocation && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-teal-600">
        🐾 Browse Pets for Adoption
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <select
          name="type"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">All Types</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Rabbit">Rabbit</option>
        </select>

        <select
          name="gender"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">Any Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="text"
          name="location"
          onChange={handleChange}
          placeholder="Search by location"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <input
          type="text"
          name="search"
          onChange={handleChange}
          placeholder="Search by pet name"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Pet Cards */}
      {filteredPets.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-base sm:text-lg">
          No pets match your filters.
        </p>
      )}
    </div>
  );
}
