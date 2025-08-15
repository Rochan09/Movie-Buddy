import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { MovieGrid } from './MovieGrid';
import { Loading, LoadingGrid } from './Loading';
import { Movie } from '../types/Movie';
import { discoverMovies, fetchGenres, searchMovies } from '../services/tmdbApi';
import { FilterControls } from './FilterControls';
import { Pagination } from './Pagination';

interface Genre {
  id: number;
  name: string;
}

export const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedGenre = searchParams.get('genre') || '';
  const selectedYear = searchParams.get('year') || '';
  const selectedSort = searchParams.get('sort') || 'popularity.desc';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('search') || '';

  const updateSearchParams = (newParams: { [key: string]: string | number | null }) => {
    setSearchParams(prevParams => {
      const updatedParams = new URLSearchParams(prevParams);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === '') {
          updatedParams.delete(key);
        } else {
          updatedParams.set(key, String(value));
        }
      });
      return updatedParams;
    });
  };
  
  useEffect(() => {
    const loadGenres = async () => {
      try {
        setLoading(true);
        const genresData = await fetchGenres();
        setGenres(genresData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load genres');
      } finally {
        setLoading(false);
      }
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setSearching(true);
        let data;
        if (searchQuery) {
          data = await searchMovies(searchQuery, currentPage);
        } else {
          const filters: { [key: string]: string | number } = {
            sort_by: selectedSort,
          };
          if (selectedGenre) filters.with_genres = selectedGenre;
          if (selectedYear) filters.primary_release_year = selectedYear;
          data = await discoverMovies(filters, currentPage);
        }
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movies');
      } finally {
        setSearching(false);
      }
    };

    if (!loading) {
      loadMovies();
    }
  }, [selectedGenre, selectedYear, selectedSort, currentPage, searchQuery, loading]);

  const handleSearch = useCallback((query: string) => {
    if (query !== searchQuery) {
      updateSearchParams({ search: query, page: 1 });
    } else {
      updateSearchParams({ search: query });
    }
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    updateSearchParams({ page });
    window.scrollTo(0, 0);
  };

  const getTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    return 'Discover Movies';
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
        <SearchBar initialQuery={searchQuery} onSearch={handleSearch} />
        <FilterControls
          genres={genres}
          selectedGenre={selectedGenre}
          selectedYear={selectedYear}
          selectedSort={selectedSort}
          onGenreChange={(g) => updateSearchParams({ genre: g, page: 1 })}
          onYearChange={(y) => updateSearchParams({ year: y, page: 1 })}
          onSortChange={(s) => updateSearchParams({ sort: s, page: 1 })}
        />
        
        {searching ? (
          <LoadingGrid />
        ) : (
          <>
            <MovieGrid movies={movies} title={getTitle()} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};
