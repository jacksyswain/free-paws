import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center p-4 mt-6 text-gray-600 text-sm md:text-base border-t border-gray-300 shadow-inner">
      © {new Date().getFullYear()} FreePaws | All rights reserved.
    </footer>
  );
}