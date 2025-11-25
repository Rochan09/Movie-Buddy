import React, { useState, useEffect } from 'react';
import { Sparkles, Ghost, Laugh, Brain, Zap, Heart, Telescope, Search, Award, Shuffle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { discoverMovies } from '../services/tmdbApi';
import { Movie } from '../types/Movie';
import { MovieGrid } from './MovieGrid';
import { LoadingGrid } from './Loading';

interface MoodCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  genreIds: number[];
  count: number;
}

const moodCategories: MoodCategory[] = [
  {
    id: 'spooky',
    name: 'Spooky/Horror',
    description: 'For thriller lovers',
    icon: <Ghost className="w-12 h-12" />,
    color: 'from-red-600 to-orange-600',
    genreIds: [27, 53], // Horror, Thriller
    count: 684
  },
  {
    id: 'comedy',
    name: 'Comedy Gold',
    description: 'Laugh-out-loud movies',
    icon: <Laugh className="w-12 h-12" />,
    color: 'from-yellow-500 to-orange-400',
    genreIds: [35], // Comedy
    count: 3000
  },
  {
    id: 'mind-bending',
    name: 'Mind-Bending',
    description: 'Complex plots, twists',
    icon: <Brain className="w-12 h-12" />,
    color: 'from-purple-600 to-blue-600',
    genreIds: [878, 9648], // Sci-Fi, Mystery
    count: 13
  },
  {
    id: 'adrenaline',
    name: 'Adrenaline Rush',
    description: 'Fast-paced action',
    icon: <Zap className="w-12 h-12" />,
    color: 'from-red-500 to-orange-500',
    genreIds: [28, 12], // Action, Adventure
    count: 638
  },
  {
    id: 'emotional',
    name: 'Emotional Journey',
    description: 'Drama and tearjerkers',
    icon: <Heart className="w-12 h-12" />,
    color: 'from-pink-500 to-rose-600',
    genreIds: [18, 10749], // Drama, Romance
    count: 803
  },
  {
    id: 'sci-fi',
    name: 'Sci-Fi Adventure',
    description: 'Space and future themes',
    icon: <Telescope className="w-12 h-12" />,
    color: 'from-cyan-500 to-blue-600',
    genreIds: [878, 12], // Sci-Fi, Adventure
    count: 73
  },
  {
    id: 'mystery',
    name: 'Mystery Detective',
    description: 'Whodunit films',
    icon: <Search className="w-12 h-12" />,
    color: 'from-gray-700 to-gray-900',
    genreIds: [9648, 80], // Mystery, Crime
    count: 94
  },
  {
    id: 'oscar',
    name: 'Critically Acclaimed',
    description: 'Highly-rated masterpieces',
    icon: <Award className="w-12 h-12" />,
    color: 'from-yellow-600 to-amber-600',
    genreIds: [], // Will use vote_average filter
    count: 1000
  }
];

export const MoodPicks: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<MoodCategory | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [randomPickId, setRandomPickId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedMood) {
      setRandomPickId(null);
      loadMoodMovies(selectedMood);
    }
  }, [selectedMood]);

  const loadMoodMovies = async (mood: MoodCategory) => {
    setLoading(true);
    setError(null);
    try {
      const filters: { [key: string]: string | number } = {
        sort_by: 'popularity.desc',
      };

      if (mood.id === 'oscar') {
        // Critically acclaimed: High ratings with substantial votes
        filters['vote_average.gte'] = 8.0;
        filters['vote_count.gte'] = 2000;
        filters.sort_by = 'vote_average.desc';
      } else {
        filters.with_genres = mood.genreIds.join(',');
      }

      const data = await discoverMovies(filters, 1);
      
      // Shuffle the results
      const shuffled = [...(data.results || [])].sort(() => Math.random() - 0.5);
      setMovies(shuffled);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movies');
    } finally {
      setLoading(false);
    }
  };

  const handleShuffle = () => {
    setRandomPickId(null);
    if (selectedMood) {
      loadMoodMovies(selectedMood);
    }
  };

  const handleRandomMood = () => {
    const randomMood = moodCategories[Math.floor(Math.random() * moodCategories.length)];
    setSelectedMood(randomMood);
  };

  const handleMoodClick = (mood: MoodCategory) => {
    setSelectedMood(mood);
    // Scroll to movies section after a brief delay
    setTimeout(() => {
      const moviesSection = document.getElementById('movies-section');
      if (moviesSection) {
        moviesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What's your movie mood tonight?
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Choose your vibe and discover the perfect films
          </p>
          <button
            onClick={handleRandomMood}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            Surprise Me with a Mood!
          </button>
        </div>

        {/* Mood Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {moodCategories.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodClick(mood)}
              className={`relative bg-gradient-to-br ${mood.color} rounded-2xl p-6 text-white hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-2xl group overflow-hidden ${
                selectedMood?.id === mood.id ? 'ring-4 ring-white ring-opacity-50' : ''
              }`}
            >
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
                {mood.count}+
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                  {mood.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{mood.name}</h3>
                <p className="text-sm opacity-90">{mood.description}</p>
              </div>
            </button>
          ))}
        </div>

        {error && (
          <div className="text-center text-red-400 mb-8">
            <p>{error}</p>
          </div>
        )}

        {/* Movies Section */}
        {selectedMood && (
          <div id="movies-section" className="mt-12 pt-8 border-t border-gray-800">
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white">{selectedMood.name}</h2>
                <p className="text-gray-400 mt-2">{selectedMood.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleShuffle}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-colors duration-200"
                >
                  <Shuffle className="w-5 h-5" />
                  Shuffle Movies
                </button>
                <button
                  onClick={() => {
                    if (movies.length > 0) {
                      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                      setRandomPickId(randomMovie.id);
                      setTimeout(() => {
                        const movieCard = document.getElementById(`movie-${randomMovie.id}`);
                        if (movieCard) {
                          movieCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }, 100);
                    }
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-full transition-colors duration-200"
                >
                  <Sparkles className="w-5 h-5" />
                  Random Pick
                </button>
                <button
                  onClick={() => setSelectedMood(null)}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full transition-colors duration-200"
                >
                  Clear Selection
                </button>
              </div>
            </div>

            {loading ? (
              <LoadingGrid />
            ) : movies.length > 0 ? (
              <MovieGrid movies={movies} title="" highlightedMovieId={randomPickId} />
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-2xl text-white mb-4">No movies found</h3>
                <p className="text-gray-400">Try another mood or shuffle again</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State - Only show when no mood is selected */}
        {!selectedMood && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl text-white mb-4">Select a mood above</h3>
            <p className="text-gray-400">
              Choose your vibe and we'll recommend the perfect movies
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
