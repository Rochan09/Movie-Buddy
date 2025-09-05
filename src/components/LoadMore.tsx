import React from 'react';

interface LoadMoreProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

export const LoadMore: React.FC<LoadMoreProps> = ({ onLoadMore, isLoading, hasMore }) => {
  if (!hasMore) return null;
  return (
    <div className="flex justify-center my-12">
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="px-12 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xl hover:scale-105 hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-60 focus:outline-none focus:ring-4 focus:ring-purple-300"
      >
        {isLoading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};
