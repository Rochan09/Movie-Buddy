
import { Person, Movie } from '../types/Movie';
import { getImageUrl } from '../services/tmdbApi';

interface SearchSuggestionsProps {
  movieSuggestions: Movie[];
  personSuggestions: Person[];
  onMovieSuggestionClick: (movie: Movie) => void;
  onPersonSuggestionClick: (person: Person) => void;
}


export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  movieSuggestions,
  personSuggestions,
  onMovieSuggestionClick,
  onPersonSuggestionClick,
}) => {
  if (movieSuggestions.length === 0 && personSuggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20">
      {personSuggestions.length > 0 && (
        <>
          <div className="px-4 pt-2 pb-1 text-purple-400 text-xs font-bold">Actors/Actresses</div>
          <ul>
            {personSuggestions.map((person) => (
              <li
                key={`person-${person.id}`}
                onClick={() => onPersonSuggestionClick(person)}
                className="flex items-center p-3 hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <img
                  src={getImageUrl(person.profile_path)}
                  alt={person.name}
                  className="w-12 h-12 object-cover rounded-full mr-4"
                />
                <div>
                  <p className="text-white font-semibold">{person.name}</p>
                  <p className="text-gray-400 text-xs">{person.known_for_department}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {movieSuggestions.length > 0 && (
        <>
          <div className="px-4 pt-2 pb-1 text-purple-400 text-xs font-bold">Movies</div>
          <ul>
            {movieSuggestions.map((movie) => (
              <li
                key={`movie-${movie.id}`}
                onClick={() => onMovieSuggestionClick(movie)}
                className="flex items-center p-3 hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <p className="text-white font-semibold">{movie.title}</p>
                  <p className="text-gray-400 text-sm">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
