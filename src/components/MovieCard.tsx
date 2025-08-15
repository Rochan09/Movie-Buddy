import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, Play } from 'lucide-react';
import { Movie } from '../types/Movie';
import { getImageUrl } from '../services/tmdbApi';

interface MovieCardProps {
  movie: Movie;
  showStreamingHint?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, showStreamingHint = true }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
    >
      <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-300">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors duration-200">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>
                {typeof movie.vote_average === 'number'
                  ? movie.vote_average.toFixed(1)
                  : 'N/A'}
              </span>
            </div>
          </div>
          
          {showStreamingHint && (
            <div className="mt-2 flex items-center gap-1 text-xs text-purple-400">
              <Play className="w-3 h-3" />
              <span>View streaming options</span>
            </div>
          )}
        </div>
        
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-xs text-white font-medium">Click to view</span>
        </div>
      </div>
    </div>
  );
};
