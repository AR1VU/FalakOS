import React from 'react';

const Desktop: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-cyan-300 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-1000">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300/30 dark:bg-pink-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-cyan-300/30 dark:bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-yellow-300/30 dark:bg-yellow-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-20 w-28 h-28 bg-purple-300/30 dark:bg-purple-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      {/* Overlay for glassmorphism */}
      <div className="absolute inset-0 bg-white/5 dark:bg-black/10"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default Desktop;