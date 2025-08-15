// Utility functions for managing watchlist in localStorage
import { Movie, Person } from '../types/Movie';

const MOVIE_WATCHLIST_KEY = 'movie_watchlist';
const PERSON_WATCHLIST_KEY = 'person_watchlist';

export function getMovieWatchlist(): Movie[] {
  const data = localStorage.getItem(MOVIE_WATCHLIST_KEY);
  return data ? JSON.parse(data) : [];
}

export function addMovieToWatchlist(movie: Movie) {
  const list = getMovieWatchlist();
  if (!list.find((m) => m.id === movie.id)) {
    localStorage.setItem(MOVIE_WATCHLIST_KEY, JSON.stringify([...list, movie]));
  }
}

export function removeMovieFromWatchlist(movieId: number) {
  const list = getMovieWatchlist();
  localStorage.setItem(
    MOVIE_WATCHLIST_KEY,
    JSON.stringify(list.filter((m) => m.id !== movieId))
  );
}

export function isMovieInWatchlist(movieId: number): boolean {
  return getMovieWatchlist().some((m) => m.id === movieId);
}

export function getPersonWatchlist(): Person[] {
  const data = localStorage.getItem(PERSON_WATCHLIST_KEY);
  return data ? JSON.parse(data) : [];
}

export function addPersonToWatchlist(person: Person) {
  const list = getPersonWatchlist();
  if (!list.find((p) => p.id === person.id)) {
    localStorage.setItem(PERSON_WATCHLIST_KEY, JSON.stringify([...list, person]));
  }
}

export function removePersonFromWatchlist(personId: number) {
  const list = getPersonWatchlist();
  localStorage.setItem(
    PERSON_WATCHLIST_KEY,
    JSON.stringify(list.filter((p) => p.id !== personId))
  );
}

export function isPersonInWatchlist(personId: number): boolean {
  return getPersonWatchlist().some((p) => p.id === personId);
}
