export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
  budget: number;
  revenue: number;
  tagline: string;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface StreamingProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface WatchProviders {
  link?: string;
  flatrate?: StreamingProvider[];
  rent?: StreamingProvider[];
  buy?: StreamingProvider[];
}

export interface WatchProvidersResponse {
  id: number;
  results: {
    [countryCode: string]: WatchProviders;
  };
}