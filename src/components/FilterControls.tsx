import React from 'react';

interface Genre {
  id: number;
  name: string;
}

interface FilterControlsProps {
  genres: Genre[];
  selectedGenre: string;
  selectedYear: string;
  selectedSort: string;
  onGenreChange: (genre: string) => void;
  onYearChange: (year: string) => void;
  onSortChange: (sort: string) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  genres,
  selectedGenre,
  selectedYear,
  selectedSort,
  onGenreChange,
  onYearChange,
  onSortChange,
}) => {
  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
      {/* Genre Filter Dropdown */}
      <select
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* Year Filter Dropdown */}
      <select
        value={selectedYear}
        onChange={(e) => onYearChange(e.target.value)}
        className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Rating Sort Dropdown */}
      <select
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="popularity.desc">Popularity</option>
        <option value="vote_average.desc">Rating</option>
        <option value="release_date.desc">Newest</option>
      </select>
    </div>
  );
};
