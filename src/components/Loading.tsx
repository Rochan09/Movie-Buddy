import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
}

export const Loading: React.FC<LoadingProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="w-full h-full border-4 border-purple-200 border-t-purple-500 rounded-full"></div>
      </div>
    </div>
  );
};

export const LoadingGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-700 rounded-lg aspect-[2/3] mb-3"></div>
          <div className="bg-gray-700 h-4 rounded mb-2"></div>
          <div className="bg-gray-700 h-3 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
};