import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from './SearchBar';
import { MovieGrid } from './MovieGrid';
import { Loading, LoadingGrid } from './Loading';
import { Movie } from '../types/Movie';
import { fetchTrendingMovies, searchMovies } from '../services/tmdbApi';

export const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState('');

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    // Prevent duplicate searches
    if (query === lastQuery) return;
    
    setSearchQuery(query);
    setLastQuery(query);
    
    if (!query.trim()) {
      // If search is empty, show trending movies
      try {
        setSearching(true);
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movies');
      } finally {
        setSearching(false);
      }
      return;
    }

    try {
      setSearching(true);
      const data = await searchMovies(query);
      setMovies(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search movies');
    } finally {
      setSearching(false);
    }
  }, [lastQuery]);

  const getTitle = () => {
    if (searchQuery.trim()) {
      return `Search results for "${searchQuery}"`;
    }
    return 'Trending Movies';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-gray-700 h-14 rounded-full animate-pulse"></div>
          </div>
          <LoadingGrid />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl text-white mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <p className="text-gray-500 text-sm">
            Make sure to add your TMDB API key in src/services/tmdbApi.ts
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-6">
        <SearchBar onSearch={handleSearch} />
        
        {searching ? (
          <LoadingGrid />
        ) : (
          <MovieGrid movies={movies} title={getTitle()} />
        )}
      </div>
    </div>
  );
};