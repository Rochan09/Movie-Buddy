// You'll need to get your API key from https://developer.themoviedb.org
// Replace 'YOUR_API_KEY' with your actual TMDB API key
const API_KEY = '4520b9b687903fccc82ce7becd770e93';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const getImageUrl = (path: string | null): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${IMAGE_BASE_URL}${path}`;
};

export const fetchTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  return response.json();
};

export const searchMovies = async (query: string) => {
  if (!query.trim()) return { results: [] };
  
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error('Failed to search movies');
  }
  return response.json();
};

export const fetchMovieDetails = async (movieId: string) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};

export const fetchMovieRecommendations = async (movieId: string) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }
  return response.json();
};

export const fetchWatchProviders = async (movieId: string) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch watch providers');
  }
  return response.json();
};