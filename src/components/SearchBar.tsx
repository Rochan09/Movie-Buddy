import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search for movies..." 
}) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      const debounceTimer = setTimeout(() => {
        onSearch(searchQuery);
      }, 500);
      return () => clearTimeout(debounceTimer);
    },
    [onSearch]
  );

  useEffect(() => {
    const cleanup = debouncedSearch(query);
    return cleanup;
  }, [query, debouncedSearch]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="relative backdrop-blur-sm bg-gray-800/50 rounded-full border border-gray-700 shadow-xl">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-transparent text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};