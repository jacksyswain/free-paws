import React, { useEffect, useState } from 'react';

const defaultForm = {
  id: null,
  name: '',
  type: '',
  breed: '',
  age: '',
  gender: '',
  location: '',
  image: ''
};

export default function AdminPanel() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const localPets = JSON.parse(localStorage.getItem("petsData"));
    if (localPets) {
      setPets(localPets);
    } else {
      import('../data/pets.json').then(module => {
        setPets(module.default);
        localStorage.setItem("petsData", JSON.stringify(module.default));
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name || !form.type || !form.breed || !form.age ||
      !form.gender || !form.location || !form.image
    ) {
      alert("Please fill all fields.");
      return;
    }

    let updatedPets;
    if (isEdit) {
      updatedPets = pets.map(p => (p.id === form.id ? form : p));
    } else {
      const newPet = { ...form, id: Date.now() };
      updatedPets = [...pets, newPet];
    }

    setPets(updatedPets);
    localStorage.setItem("petsData", JSON.stringify(updatedPets));
    setForm(defaultForm);
    setIsEdit(false);
  };

  const handleEdit = (pet) => {
    setForm(pet);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure to delete this pet?")) return;
    const updatedPets = pets.filter(p => p.id !== id);
    setPets(updatedPets);
    localStorage.setItem("petsData", JSON.stringify(updatedPets));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-teal-600">
        Admin Panel – Manage Pets
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Object.entries(defaultForm).map(([key]) =>
          key !== 'id' ? (
            <input
              key={key}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={form[key]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          ) : null
        )}
        <button
          type="submit"
          className="col-span-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition font-semibold"
        >
          {isEdit ? "Update Pet" : "Add Pet"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-left text-sm sm:text-base">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-2 border-b border-gray-300">Name</th>
              <th className="p-2 border-b border-gray-300">Type</th>
              <th className="p-2 border-b border-gray-300">Breed</th>
              <th className="p-2 border-b border-gray-300">Age</th>
              <th className="p-2 border-b border-gray-300">Gender</th>
              <th className="p-2 border-b border-gray-300">Location</th>
              <th className="p-2 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id} className="hover:bg-gray-50">
                <td className="p-2 border-b border-gray-200">{pet.name}</td>
                <td className="p-2 border-b border-gray-200">{pet.type}</td>
                <td className="p-2 border-b border-gray-200">{pet.breed}</td>
                <td className="p-2 border-b border-gray-200">{pet.age}</td>
                <td className="p-2 border-b border-gray-200">{pet.gender}</td>
                <td className="p-2 border-b border-gray-200">{pet.location}</td>
                <td className="p-2 border-b border-gray-200 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
                  <button
                    onClick={() => handleEdit(pet)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pet.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
