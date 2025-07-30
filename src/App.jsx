import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import PetList from './pages/PetList';
import PetDetails from './pages/PetDetails';
import AdoptionForm from './pages/AdoptionForm';
import Favorites from './pages/Favorites';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Header />

      {/* Main content wrapper with responsive spacing and width */}
      <main className="px-4 py-6 sm:px-6 md:px-8 max-w-screen-xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<PetList />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/adopt/:id" element={<AdoptionForm />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
