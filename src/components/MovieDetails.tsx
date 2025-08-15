import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Calendar } from 'lucide-react';
import { isMovieInWatchlist, addMovieToWatchlist, removeMovieFromWatchlist } from '../services/watchlist';
import { MovieDetails as MovieDetailsType, Movie, WatchProvidersResponse } from '../types/Movie';
import { fetchMovieDetails, fetchMovieRecommendations, fetchWatchProviders, getImageUrl } from '../services/tmdbApi';
import { Loading } from './Loading';
import { MovieGrid } from './MovieGrid';
import { StreamingPlatforms } from './StreamingPlatforms';

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [watchProviders, setWatchProviders] = useState<WatchProvidersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovieData = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const [movieData, recommendationsData, watchProvidersData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieRecommendations(id),
          fetchWatchProviders(id)
        ]);
        
        setMovie(movieData);
        setRecommendations(recommendationsData.results.slice(0, 12));
        setWatchProviders(watchProvidersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movie data');
      } finally {
        setLoading(false);
      }
    };

    loadMovieData();
  }, [id]);
  useEffect(() => {
    if (movie) {
      setInWatchlist(isMovieInWatchlist(movie.id));
    }
  }, [movie]);

  const handleWatchlistClick = () => {
    if (!movie) return;
    if (inWatchlist) {
      removeMovieFromWatchlist(movie.id);
      setInWatchlist(false);
    } else {
      addMovieToWatchlist(movie);
      setInWatchlist(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <Loading size="large" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl text-white mb-4">Movie not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  // Get watch providers for US region (you can make this configurable)
  const usProviders = watchProviders?.results?.US || null;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        {movie.backdrop_path && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${getImageUrl(movie.backdrop_path)})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40" />
          </div>
        )}
        
        <div className="relative z-10 pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to movies</span>
            </button>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Poster */}
              <div className="lg:w-80 flex-shrink-0">
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>

              {/* Details */}
              <div className="flex-grow">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  {movie.title}
                </h1>
                
                {movie.tagline && (
                  <p className="text-xl text-purple-300 italic mb-6">"{movie.tagline}"</p>
                )}

                <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-gray-400">({movie.vote_count.toLocaleString()} votes)</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{movie.runtime} min</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {movie.overview}
                  </p>
                  <button
                    onClick={handleWatchlistClick}
                    className={`mt-6 px-4 py-2 rounded-full font-semibold transition-colors ${inWatchlist ? 'bg-red-500 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
                  >
                    {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Streaming Platforms */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <StreamingPlatforms providers={usProviders} movieTitle={movie.title} />
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <MovieGrid movies={recommendations} title="You might also like" />
        </div>
      )}
    </div>
  );
};
