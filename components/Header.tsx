import React from 'react';

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M19 3v4M17 5h4M12 2v4M10 4h4M8 10l-2 2 2 2M16 10l2 2-2 2M12 18v4M10 20h4M5 17l2-2 2 2M15 17l2 2 2-2" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <SparklesIcon />
          <h1 className="text-2xl font-bold tracking-tight text-white/95">
            照片魔法AI
          </h1>
        </div>
      </div>
    </header>
  );
};