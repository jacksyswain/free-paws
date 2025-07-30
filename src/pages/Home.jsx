import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import petData from '../data/pets.json';
import PetCard from '../components/PetCard';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Home() {
  const [featuredPets, setFeaturedPets] = useState([]);

  useEffect(() => {
    // Shuffle and pick first 8 pets for the slider
    const shuffled = [...petData].sort(() => 0.5 - Math.random());
    setFeaturedPets(shuffled.slice(0, 8));
  }, []);

  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section className="bg-teal-600 text-white py-12 px-4 text-center sm:py-16">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Find Your New Best Friend
        </h1>
        <p className="text-base sm:text-lg mb-6">
          Adopt a loving pet and change a life — theirs and yours.
        </p>
        <Link
          to="/pets"
          className="inline-block bg-white text-teal-700 px-6 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Browse Available Pets
        </Link>
      </section>

      {/* Why Adopt */}
      <section className="bg-white py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-teal-600">
            Why Adopt a Pet?
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            Millions of animals wait in shelters for a second chance. When you adopt, you're saving a life and bringing love home.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-white shadow rounded">
              <div className="text-4xl">🔍</div>
              <h3 className="font-semibold text-lg mt-3">Browse Pets</h3>
              <p className="text-sm text-gray-600">
                Search by type, breed, or location to find your perfect companion.
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <div className="text-4xl">📝</div>
              <h3 className="font-semibold text-lg mt-3">Fill Adoption Form</h3>
              <p className="text-sm text-gray-600">
                Share your preferences and lifestyle. Help us find your match.
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <div className="text-4xl">🏡</div>
              <h3 className="font-semibold text-lg mt-3">Bring Home Love</h3>
              <p className="text-sm text-gray-600">
                Get ready for tail wags and happy meows from your new friend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Most Demanded Pets Slider */}
      <section className="py-10 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">
            Most Demanded Pets
          </h2>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {featuredPets.map((pet) => (
              <SwiperSlide key={pet.id}>
                <PetCard pet={pet} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Featured Pets Grid */}
      <section className="py-10 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">
            Featured Pets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-teal-600">
            Happy Adopters Say…
          </h2>
          <blockquote className="text-gray-700 italic mb-4">
            “Adopting from this platform changed our lives. Milo is now part of our family!”
          </blockquote>
          <p className="font-semibold text-gray-900">— Asha & Family, Bangalore</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 text-center px-4">
        <h2 className="text-xl font-semibold mb-4">
          Ready to meet your new best friend?
        </h2>
        <Link
          to="/pets"
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded shadow hover:bg-teal-700 transition"
        >
          Start Browsing
        </Link>
      </section>
    </div>
  );
}