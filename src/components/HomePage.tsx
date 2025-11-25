import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { MovieGrid } from './MovieGrid';
import { LoadingGrid } from './Loading';
import { Movie } from '../types/Movie';
import { discoverMovies, fetchGenres, searchMovies, fetchTrendingMovies } from '../services/tmdbApi';
import { FilterControls } from './FilterControls';
import { LoadMore } from './LoadMore';

interface Genre {
  id: number;
  name: string;
}

export const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedGenre = searchParams.get('genre') || '';
  const selectedYear = searchParams.get('year') || '';
  const selectedSort = searchParams.get('sort') || 'popularity.desc';
  const selectedLanguage = searchParams.get('language') || '';
  // const currentPage = parseInt(searchParams.get('page') || '1', 10); // No longer used
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
        const [genresData, trendingData] = await Promise.all([
          fetchGenres(),
          fetchTrendingMovies()
        ]);
        setGenres(genresData || []);
        setTrendingMovies(trendingData.results.slice(0, 10) || []);
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
          data = await searchMovies(searchQuery, 1);
        } else {
          const filters: { [key: string]: string | number } = {
            sort_by: selectedSort,
          };
          if (selectedGenre) filters.with_genres = selectedGenre;
          if (selectedYear) filters.primary_release_year = selectedYear;
          if (selectedLanguage) filters.with_original_language = selectedLanguage;
          data = await discoverMovies(filters, 1);
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
  }, [selectedGenre, selectedYear, selectedSort, selectedLanguage, searchQuery, loading]);

  // Track current page for Load More
  const [loadMorePage, setLoadMorePage] = useState(1);

  // Reset page when filters/search change
  useEffect(() => {
    setLoadMorePage(1);
  }, [selectedGenre, selectedYear, selectedSort, selectedLanguage, searchQuery]);

  const handleLoadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const nextPage = loadMorePage + 1;
      let data;
      if (searchQuery) {
        data = await searchMovies(searchQuery, nextPage);
      } else {
        const filters: { [key: string]: string | number } = {
          sort_by: selectedSort,
        };
        if (selectedGenre) filters.with_genres = selectedGenre;
        if (selectedYear) filters.primary_release_year = selectedYear;
        if (selectedLanguage) filters.with_original_language = selectedLanguage;
        data = await discoverMovies(filters, nextPage);
      }
      setMovies((prev) => [...prev, ...(data.results || [])]);
      setLoadMorePage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more movies');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSearch = useCallback((query: string) => {
    if (query !== searchQuery) {
      updateSearchParams({ search: query, page: 1 });
    } else {
      updateSearchParams({ search: query });
    }
  }, [searchQuery]);

  // const handlePageChange = (page: number) => {
  //   updateSearchParams({ page });
  //   window.scrollTo(0, 0);
  // };

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
        
        {/* Trending Section - Only show when no search/filters applied */}
        {!searchQuery && !selectedGenre && !selectedYear && !selectedLanguage && trendingMovies.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold text-white">Trending Today</h2>
            </div>
            <div className="relative">
              <div className="overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-4" style={{ width: 'max-content' }}>
                  {trendingMovies.map((movie) => (
                    <div key={movie.id} className="w-48 flex-shrink-0">
                      <div
                        onClick={() => window.location.href = `/movie/${movie.id}`}
                        className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                      >
                        <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:shadow-red-500/30 transition-all duration-300">
                          <div className="aspect-[2/3] overflow-hidden">
                            <img
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                              alt={movie.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {movie.vote_average.toFixed(1)}
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-red-300 transition-colors duration-200">
                              {movie.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <FilterControls
          genres={genres}
          selectedGenre={selectedGenre}
          selectedYear={selectedYear}
          selectedSort={selectedSort}
          selectedLanguage={selectedLanguage}
          onGenreChange={(g) => updateSearchParams({ genre: g, page: 1 })}
          onYearChange={(y) => updateSearchParams({ year: y, page: 1 })}
          onSortChange={(s) => updateSearchParams({ sort: s, page: 1 })}
          onLanguageChange={(l) => updateSearchParams({ language: l, page: 1 })}
        />
        
        {searching ? (
          <LoadingGrid />
        ) : (
          <>
            <MovieGrid movies={movies} title={getTitle()} />
            <LoadMore
              onLoadMore={handleLoadMore}
              isLoading={isLoadingMore}
              hasMore={loadMorePage < totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
};
