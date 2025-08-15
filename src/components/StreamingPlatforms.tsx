import React from 'react';
import { ExternalLink, Play, ShoppingCart, Download } from 'lucide-react';
import { WatchProviders } from '../types/Movie';
import { getImageUrl } from '../services/tmdbApi';

interface StreamingPlatformsProps {
  providers: WatchProviders | null;
  movieTitle: string;
}

export const StreamingPlatforms: React.FC<StreamingPlatformsProps> = ({ 
  providers, 
  movieTitle 
}) => {
  if (!providers) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Play className="w-5 h-5" />
          Where to Watch
        </h3>
        <p className="text-gray-400">
          Streaming information not available for this movie.
        </p>
      </div>
    );
  }

  const { flatrate, rent, buy, link } = providers;

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Play className="w-5 h-5" />
          Where to Watch
        </h3>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center gap-1 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            More info
          </a>
        )}
      </div>

      <div className="space-y-6">
        {/* Streaming */}
        {flatrate && flatrate.length > 0 && (
          <div>
            <h4 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <Play className="w-4 h-4 text-green-400" />
              Stream
            </h4>
            <div className="flex flex-wrap gap-3">
              {flatrate.map((provider) => (
                <div
                  key={provider.provider_id}
                  className="flex items-center gap-2 bg-gray-700/50 rounded-lg p-3 border border-gray-600 hover:border-green-400/50 transition-colors duration-200"
                >
                  <img
                    src={getImageUrl(provider.logo_path)}
                    alt={provider.provider_name}
                    className="w-8 h-8 rounded-md"
                  />
                  <span className="text-white text-sm font-medium">
                    {provider.provider_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rent */}
        {rent && rent.length > 0 && (
          <div>
            <h4 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-400" />
              Rent
            </h4>
            <div className="flex flex-wrap gap-3">
              {rent.map((provider) => (
                <div
                  key={provider.provider_id}
                  className="flex items-center gap-2 bg-gray-700/50 rounded-lg p-3 border border-gray-600 hover:border-blue-400/50 transition-colors duration-200"
                >
                  <img
                    src={getImageUrl(provider.logo_path)}
                    alt={provider.provider_name}
                    className="w-8 h-8 rounded-md"
                  />
                  <span className="text-white text-sm font-medium">
                    {provider.provider_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buy */}
        {buy && buy.length > 0 && (
          <div>
            <h4 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-yellow-400" />
              Buy
            </h4>
            <div className="flex flex-wrap gap-3">
              {buy.map((provider) => (
                <div
                  key={provider.provider_id}
                  className="flex items-center gap-2 bg-gray-700/50 rounded-lg p-3 border border-gray-600 hover:border-yellow-400/50 transition-colors duration-200"
                >
                  <img
                    src={getImageUrl(provider.logo_path)}
                    alt={provider.provider_name}
                    className="w-8 h-8 rounded-md"
                  />
                  <span className="text-white text-sm font-medium">
                    {provider.provider_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!flatrate && !rent && !buy && (
          <p className="text-gray-400 text-center py-4">
            No streaming options available in your region.
          </p>
        )}
      </div>
    </div>
  );
};