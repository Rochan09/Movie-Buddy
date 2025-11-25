import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavButton } from './NavButton';

interface MobileNavProps {
  order?: string[];
}

const navConfig = [
  { href: '/', label: 'Home' },
  { href: '/mood-picks', label: 'Mood Picks' },
  { href: '/watchlist', label: 'Watchlist' },
  { href: '/about', label: 'About' },
];

export const MobileNav: React.FC<MobileNavProps> = ({ order }) => {
  const [open, setOpen] = useState(false);
  const navItems = order
    ? order.map(label => navConfig.find(item => item.label === label)).filter(Boolean)
    : navConfig;

  return (
    <div className="md:hidden">
      <button
        className="p-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {open && (
        <div className="absolute right-4 top-16 bg-gray-900 rounded-xl shadow-lg flex flex-col gap-3 p-4 z-50 border border-gray-700">
          {navItems.map(item => (
            <NavButton key={item!.label} href={item!.href} label={item!.label} />
          ))}
        </div>
      )}
    </div>
  );
};
