import React from 'react';
import { useLocation } from 'react-router-dom';
import { Home, Info, Heart } from 'lucide-react';

interface NavButtonProps {
  href: string;
  label: string;
}

export const NavButton: React.FC<NavButtonProps> = ({ href, label }) => {
  const location = useLocation();
  const isActive =
    (href === '/' && location.pathname === '/') ||
    (href !== '/' && location.pathname.startsWith(href));

  let icon = null;
  if (label === 'Home') icon = <Home className="w-5 h-5 mr-2" />;
  else if (label === 'Watchlist') icon = <Heart className="w-5 h-5 mr-2" />;
  else if (label === 'About') icon = <Info className="w-5 h-5 mr-2" />;

  return (
    <a
      href={href}
      className={`flex items-center px-4 py-2 rounded-full font-semibold transition-colors text-white text-base focus:outline-none focus:ring-2 focus:ring-purple-400 ${
        isActive ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'
      }`}
    >
      {icon}
      {label}
    </a>
  );
};