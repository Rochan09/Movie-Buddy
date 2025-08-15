import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Film } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { MovieDetails } from './components/MovieDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Film className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Movie<span className="text-purple-400">Buddy</span>
              </h1>
            </div>
          </div>
        </header>

        {/* Routes */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
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