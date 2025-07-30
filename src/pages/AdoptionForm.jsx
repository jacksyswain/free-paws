import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import petData from '../data/pets.json';

export default function AdoptionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pet = petData.find(p => p.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return (
      formData.name.trim() &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      /^[0-9]{10}$/.test(formData.phone) &&
      formData.reason.trim()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill all fields correctly.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => navigate("/pets"), 2000);
  };

  if (!pet) {
    return (
      <div className="text-center mt-10 px-4 text-lg font-semibold">
        Pet not found
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center mt-10 px-4 text-green-600 text-xl font-semibold">
        🎉 Adoption request for <strong>{pet.name}</strong> submitted successfully!
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 bg-white rounded shadow">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-teal-600">
        Adopt {pet.name}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (10 digits)"
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          title="Enter 10 digit phone number"
        />

        <textarea
          name="reason"
          placeholder="Why do you want to adopt this pet?"
          className="w-full border border-gray-300 p-3 rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formData.reason}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded hover:bg-teal-700 transition font-semibold"
        >
          Submit Adoption Request
        </button>
      </form>
    </div>
  );
}
