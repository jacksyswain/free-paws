import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-teal-600 text-white p-4 flex items-center justify-between relative">
      <h1 className="text-2xl font-bold">🐾 FreePaws</h1>

      {/* Hamburger button for mobile */}
      <button
        className="md:hidden focus:outline-none"
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {/* Hamburger icon */}
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            // X icon when open
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            // Hamburger lines when closed
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Nav links */}
      <nav
        className={`
          absolute top-full left-0 w-full bg-teal-600 text-white md:static md:w-auto md:flex md:space-x-6
          transition-all duration-300 ease-in-out
          ${menuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden md:max-h-full md:overflow-visible'}
        `}
      >
        <Link
          to="/"
          className="block px-4 py-2 hover:bg-teal-700 md:inline-block md:p-0"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/pets"
          className="block px-4 py-2 hover:bg-teal-700 md:inline-block md:p-0"
          onClick={() => setMenuOpen(false)}
        >
          Browse Pets
        </Link>
        <Link
          to="/favorites"
          className="block px-4 py-2 hover:bg-teal-700 md:inline-block md:p-0"
          onClick={() => setMenuOpen(false)}
        >
          Favorites
        </Link>
        <Link
          to="/admin"
          className="block px-4 py-2 hover:bg-teal-700 md:inline-block md:p-0"
          onClick={() => setMenuOpen(false)}
        >
          Admin
        </Link>
      </nav>
    </header>
  );
}
