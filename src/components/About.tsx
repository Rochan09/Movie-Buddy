import React from 'react';

const aboutText = `Welcome to MovieBuddy – your popcorn partner in crime! 🍿✨\n\nTired of endlessly scrolling through streaming apps, not knowing what to watch? Same. That’s why MovieBuddy is here. Think of it as your cool movie geek friend who’s always got great recommendations (minus the annoying spoilers).\n\nWith MovieBuddy, you can:\n🎬 Discover awesome movies without the headache.\n🔍 Search for films, actors, and that one movie you swear you saw years ago.\n🎭 Filter by genre, year, or just what’s trending right now.\n⭐ Save movies to your watchlist (because we all forget titles five minutes later).\n📖 Dive into details like cast, reviews, and even where you can stream it.\n\nBuilt with a sleek React + Tailwind setup, it’s fast, responsive, and easy on the eyes. Basically, it’s like Netflix’s younger, cooler cousin.\n\nSo grab your snacks, hit play, and let MovieBuddy do the movie-hunting for you. 🎥🍿`;

export const About: React.FC = () => (
  <div className="min-h-screen w-full py-16 px-6 text-white bg-gray-900">
    <div className="text-base md:text-lg leading-relaxed whitespace-pre-line max-w-5xl mx-auto">
      {aboutText}
    </div>
  </div>
);
