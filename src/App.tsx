import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Film } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { MovieDetails } from './components/MovieDetails';
import { PersonDetails } from './components/PersonDetails';
import { Watchlist } from './components/Watchlist';
import { About } from './components/About';
import { NavButton } from './components/NavButton';
import { MobileNav } from './components/MobileNav';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
  <header className="bg-gradient-to-r from-purple-400 via-pink-300 to-yellow-300 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 relative">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-800 rounded-lg">
                <Film className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">
                <span className="text-white">Movie</span><span className="text-purple-900 font-extrabold">Buddy</span>
              </h1>
              {/* Desktop nav */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 gap-3 hidden md:flex">
                <NavButton href="/" label="Home" />
                <NavButton href="/watchlist" label="Watchlist" />
                <NavButton href="/about" label="About" />
              </div>
              {/* Mobile nav */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex md:hidden">
                <MobileNav order={["Home", "Watchlist", "About"]} />
              </div>
            </div>
            {/* Removed duplicate Home button */}
          </div>
        </header>

        {/* Routes */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/person/:id" element={<PersonDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center text-gray-400">
              <p className="mb-2">
                Powered by{' '}
                <a 
                  href="https://www.themoviedb.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  The Movie Database (TMDB)
                </a>
              </p>
              <p className="text-sm">
                Built with React, TypeScript, and Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;