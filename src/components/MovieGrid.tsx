import React from 'react';
import { Movie } from '../types/Movie';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, title }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🍿</div>
        <h3 className="text-xl text-gray-400 mb-2">No movies found</h3>
        <p className="text-gray-500">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};