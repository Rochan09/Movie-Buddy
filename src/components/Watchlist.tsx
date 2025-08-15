import React, { useEffect, useState } from 'react';
import { getMovieWatchlist, getPersonWatchlist, removeMovieFromWatchlist, removePersonFromWatchlist } from '../services/watchlist';
import { MovieCard } from './MovieCard';
import { getImageUrl } from '../services/tmdbApi';
import { useNavigate } from 'react-router-dom';

export const Watchlist: React.FC = () => {
  const [movies, setMovies] = useState(getMovieWatchlist());
  const [people, setPeople] = useState(getPersonWatchlist());
  const navigate = useNavigate();

  const handleRemoveMovie = (id: number) => {
    removeMovieFromWatchlist(id);
    setMovies(getMovieWatchlist());
  };

  const handleRemovePerson = (id: number) => {
    removePersonFromWatchlist(id);
    setPeople(getPersonWatchlist());
  };

  useEffect(() => {
    setMovies(getMovieWatchlist());
    setPeople(getPersonWatchlist());
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-white mb-8">My Watchlist</h2>
      <h3 className="text-2xl font-semibold text-purple-400 mb-4">Movies</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="relative group">
              <MovieCard movie={movie} />
              <button
                onClick={() => handleRemoveMovie(movie.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs opacity-80 group-hover:opacity-100 transition"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-gray-400">No movies in your watchlist.</div>
        )}
      </div>
      <h3 className="text-2xl font-semibold text-purple-400 mb-4">Actors/Actresses</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {people.length > 0 ? (
          people.map((person) => (
            <div key={person.id} className="relative group cursor-pointer" onClick={() => navigate(`/person/${person.id}`)}>
              <div className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
                <img
                  src={getImageUrl(person.profile_path)}
                  alt={person.name}
                  className="w-24 h-24 object-cover rounded-full border-2 border-purple-500 mb-2"
                />
                <div className="text-white font-semibold text-lg text-center">{person.name}</div>
                <div className="text-gray-400 text-xs mb-2 text-center">{person.known_for_department}</div>
                <button
                  onClick={e => { e.stopPropagation(); handleRemovePerson(person.id); }}
                  className="bg-red-500 text-white rounded-full px-2 py-1 text-xs mt-2 opacity-80 hover:opacity-100 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-gray-400">No actors/actresses in your watchlist.</div>
        )}
      </div>
    </div>
  );
};
