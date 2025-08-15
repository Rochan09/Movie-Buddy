import React from 'react';
import { Movie } from '../types/Movie';
import { getImageUrl } from '../services/tmdbApi';

interface SearchSuggestionsProps {
  suggestions: Movie[];
  onSuggestionClick: (movie: Movie) => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  onSuggestionClick,
}) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20">
      <ul>
        {suggestions.map((movie) => (
          <li
            key={movie.id}
            onClick={() => onSuggestionClick(movie)}
            className="flex items-center p-3 hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-12 h-16 object-cover rounded-md mr-4"
            />
            <div>
              <p className="text-white font-semibold">{movie.title}</p>
              <p className="text-gray-400 text-sm">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
