import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Movie, Person } from '../types/Movie';
import { searchMovies, searchPeople } from '../services/tmdbApi';
import { SearchSuggestions } from './SearchSuggestions';

interface SearchBarProps {
  initialQuery: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery,
  onSearch,
  placeholder = 'Search for movies...',
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [movieSuggestions, setMovieSuggestions] = useState<Movie[]>([]);
  const [personSuggestions, setPersonSuggestions] = useState<Person[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
    setShowSuggestions(true);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      if (newQuery.trim()) {
        const [movieData, personData] = await Promise.all([
          searchMovies(newQuery),
          searchPeople(newQuery),
        ]);
        setMovieSuggestions(movieData.results.slice(0, 5));
        setPersonSuggestions(personData.results.slice(0, 5));
      } else {
        setMovieSuggestions([]);
        setPersonSuggestions([]);
      }
    }, 300);
  };

  const handleClear = () => {
    setQuery('');
    setMovieSuggestions([]);
    setPersonSuggestions([]);
    setShowSuggestions(false);
    onSearch('');
  };

  const handleMovieSuggestionClick = (movie: Movie) => {
    setQuery(movie.title);
    setMovieSuggestions([]);
    setPersonSuggestions([]);
    setShowSuggestions(false);
    navigate(`/movie/${movie.id}`);
  };

  const handlePersonSuggestionClick = (person: Person) => {
    setQuery(person.name);
    setMovieSuggestions([]);
    setPersonSuggestions([]);
    setShowSuggestions(false);
    navigate(`/person/${person.id}`);
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-8" ref={searchBarRef}>
      <div className="relative backdrop-blur-sm bg-gray-800/50 rounded-full border border-gray-700 shadow-xl">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-transparent text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {showSuggestions && (
        <SearchSuggestions
          movieSuggestions={movieSuggestions}
          personSuggestions={personSuggestions}
          onMovieSuggestionClick={handleMovieSuggestionClick}
          onPersonSuggestionClick={handlePersonSuggestionClick}
        />
      )}
    </div>
  );
};
