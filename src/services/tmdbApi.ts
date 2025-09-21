import { mockMovies, mockGenres, mockMovieDetails } from './mockData';

// Using different CORS proxy to bypass network restrictions
const CORS_PROXY = 'https://corsproxy.io/?';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '4520b9b687903fccc82ce7becd770e93';
const BASE_URL = `${CORS_PROXY}${TMDB_BASE_URL}`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

// Helper function to make API calls with fallback to mock data
const fetchWithFallback = async (url: string, fallbackData: any) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('API request failed, using mock data:', error);
    return fallbackData;
  }
};

export const getImageUrl = (path: string | null): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${IMAGE_BASE_URL}${path}`;
};

export const fetchGenres = async () => {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
  const data = await fetchWithFallback(url, { genres: mockGenres });
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
  const url = `${BASE_URL}/discover/movie?${params.toString()}`;
  return await fetchWithFallback(url, mockMovies);
};

export const fetchTrendingMovies = async () => {
  const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
  return await fetchWithFallback(url, mockMovies);
};

export const searchMovies = async (query: string, page: number = 1) => {
  if (!query.trim()) return { results: [], total_pages: 1 };

  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
  // Filter mock data based on search query for demo
  const filteredMockData = {
    ...mockMovies,
    results: mockMovies.results.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    )
  };
  return await fetchWithFallback(url, filteredMockData);
};

export const fetchMovieDetails = async (movieId: string) => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
  const fallbackData = (mockMovieDetails as any)[movieId] || mockMovieDetails[550];
  return await fetchWithFallback(url, fallbackData);
};

export const fetchMovieRecommendations = async (movieId: string) => {
  const url = `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`;
  return await fetchWithFallback(url, mockMovies);
};

export const fetchWatchProviders = async (movieId: string) => {
  const url = `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`;
  const fallbackData = { results: {} };
  return await fetchWithFallback(url, fallbackData);
};

// Search for people (actors/actresses) by name
export const searchPeople = async (query: string, page: number = 1) => {
  if (!query.trim()) return { results: [], total_pages: 1 };
  const url = `${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
  const fallbackData = { results: [], total_pages: 1 };
  return await fetchWithFallback(url, fallbackData);
};

// Fetch person details by ID
export const fetchPersonDetails = async (personId: string) => {
  const url = `${BASE_URL}/person/${personId}?api_key=${API_KEY}`;
  const fallbackData = { id: personId, name: "Unknown Person", biography: "No information available." };
  return await fetchWithFallback(url, fallbackData);
};

// Fetch movies for a person (actor/actress) by ID
export const fetchPersonMovieCredits = async (personId: string) => {
  const url = `${BASE_URL}/person/${personId}/movie_credits?api_key=${API_KEY}`;
  const fallbackData = { cast: [], crew: [] };
  return await fetchWithFallback(url, fallbackData);
};
