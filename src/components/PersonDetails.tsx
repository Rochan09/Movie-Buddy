// ...existing code (single correct component definition only, no duplicates)...
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPersonDetails, fetchPersonMovieCredits, getImageUrl } from '../services/tmdbApi';
import { Person, PersonMovieCredits, Movie } from '../types/Movie';
import { MovieCard } from './MovieCard';
import { isPersonInWatchlist, addPersonToWatchlist, removePersonFromWatchlist } from '../services/watchlist';

export const PersonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const personData = await fetchPersonDetails(id!);
        setPerson(personData);
        const credits: PersonMovieCredits = await fetchPersonMovieCredits(id!);
        setMovies(credits.cast.sort((a, b) => (b.popularity || 0) - (a.popularity || 0)));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load person details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const [inWatchlist, setInWatchlist] = useState(false);
  useEffect(() => {
    if (person) {
      setInWatchlist(isPersonInWatchlist(person.id));
    }
  }, [person]);

  const handleWatchlistClick = () => {
    if (!person) return;
    if (inWatchlist) {
      removePersonFromWatchlist(person.id);
      setInWatchlist(false);
    } else {
      addPersonToWatchlist(person);
      setInWatchlist(true);
    }
  };

  if (loading) {
    return <div className="text-center text-white py-20">Loading...</div>;
  }
  if (error || !person) {
    return <div className="text-center text-red-400 py-20">{error || 'Not found'}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={handleWatchlistClick}
        className={`mb-6 px-4 py-2 rounded-full font-semibold transition-colors ${inWatchlist ? 'bg-red-500 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
      >
        {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
      <div className="flex flex-col md:flex-row gap-8 items-start bg-gray-800 rounded-lg shadow-lg p-6 mb-10">
        <img
          src={getImageUrl(person.profile_path)}
          alt={person.name}
          className="w-40 h-40 object-cover rounded-full border-4 border-purple-500 shadow-md mb-4 md:mb-0"
        />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{person.name}</h2>
          <p className="text-purple-400 text-sm mb-2">{person.known_for_department}</p>
          {person.biography && (
            <p className="text-gray-300 mb-2 whitespace-pre-line">{person.biography}</p>
          )}
          <div className="text-gray-400 text-sm space-y-1">
            {person.birthday && <div><span className="font-semibold">Born:</span> {person.birthday}</div>}
            {person.place_of_birth && <div><span className="font-semibold">Place:</span> {person.place_of_birth}</div>}
            {person.deathday && <div><span className="font-semibold">Died:</span> {person.deathday}</div>}
            <div><span className="font-semibold">Popularity:</span> {person.popularity}</div>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">Movies</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div className="col-span-full text-gray-400">No movies found.</div>
        )}
      </div>
    </div>
  );
};
