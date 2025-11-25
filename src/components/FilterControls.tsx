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
  selectedLanguage: string;
  onGenreChange: (genre: string) => void;
  onYearChange: (year: string) => void;
  onSortChange: (sort: string) => void;
  onLanguageChange: (language: string) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  genres,
  selectedGenre,
  selectedYear,
  selectedSort,
  selectedLanguage,
  onGenreChange,
  onYearChange,
  onSortChange,
  onLanguageChange,
}) => {
  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
  
  const languages = [
    { code: '', name: 'All Languages' },
    { code: 'hi|ta|te|ml|kn|pa|mr|bn|gu', name: 'All Indian' },
    { code: 'te', name: 'Telugu' },
    { code: 'ta', name: 'Tamil' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'kn', name: 'Kannada' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'mr', name: 'Marathi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'gu', name: 'Gujarati' },
  ];

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

      {/* Language Filter Dropdown */}
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};
