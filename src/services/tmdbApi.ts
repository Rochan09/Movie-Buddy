// Search for people (actors/actresses) by name
export const searchPeople = async (query: string, page: number = 1) => {
  if (!query.trim()) return { results: [], total_pages: 1 };
  const response = await fetch(
    `${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to search people');
  }
  return response.json();
};

// Fetch person details by ID
export const fetchPersonDetails = async (personId: string) => {
  const response = await fetch(`${BASE_URL}/person/${personId}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch person details');
  }
  return response.json();
};

// Fetch movies for a person (actor/actress) by ID
export const fetchPersonMovieCredits = async (personId: string) => {
  const response = await fetch(`${BASE_URL}/person/${personId}/movie_credits?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch person movie credits');
  }
  return response.json();
};
// You'll need to get your API key from https://developer.themoviedb.org
// Replace 'YOUR_API_KEY' with your actual TMDB API key
const API_KEY = '4520b9b687903fccc82ce7becd770e93';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const getImageUrl = (path: string | null): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${IMAGE_BASE_URL}${path}`;
};

export const fetchGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }
  const data = await response.json();
  return data.genres;
};

export const discoverMovies = async (
  filters: { [key: string]: string | number },
  page: number = 1
) => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    page: String(page),
    ...Object.fromEntries(Object.entries(filters).map(([key, value]) => [key, String(value)])),
  });
  const response = await fetch(`${BASE_URL}/discover/movie?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to discover movies');
  }
  return response.json();
};

export const fetchTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  return response.json();
};

export const searchMovies = async (query: string, page: number = 1) => {
  if (!query.trim()) return { results: [], total_pages: 1 };

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`
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
