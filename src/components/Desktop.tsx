import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Desktop: React.FC = () => {
  const { theme, wallpaper } = useTheme();

  const getWallpaperStyles = () => {
    const wallpapers = {
      'soft-pastel': {
        light: 'from-pink-200 via-purple-200 to-cyan-200',
        dark: 'from-pink-900 via-purple-900 to-cyan-900'
      },
      'cosmic-dreams': {
        light: 'from-indigo-300 via-purple-300 to-pink-300',
        dark: 'from-indigo-900 via-purple-900 to-pink-900'
      },
      'digital-sunset': {
        light: 'from-orange-300 via-red-300 to-pink-300',
        dark: 'from-orange-900 via-red-900 to-pink-900'
      },
      'cyber-ocean': {
        light: 'from-blue-300 via-cyan-300 to-teal-300',
        dark: 'from-blue-900 via-cyan-900 to-teal-900'
      },
      'digital-forest': {
        light: 'from-green-300 via-emerald-300 to-teal-300',
        dark: 'from-green-900 via-emerald-900 to-teal-900'
      },
      'aurora-borealis': {
        light: 'from-purple-300 via-green-300 to-blue-300',
        dark: 'from-purple-900 via-green-900 to-blue-900'
      }
    };

    return wallpapers[wallpaper][theme];
  };

  const getOrbColors = () => {
    const orbColors = {
      'soft-pastel': {
        light: ['bg-pink-200/40', 'bg-cyan-200/40', 'bg-yellow-200/40', 'bg-purple-200/40'],
        dark: ['bg-pink-400/30', 'bg-cyan-400/30', 'bg-yellow-400/30', 'bg-purple-400/30']
      },
      'cosmic-dreams': {
        light: ['bg-indigo-200/40', 'bg-purple-200/40', 'bg-pink-200/40', 'bg-blue-200/40'],
        dark: ['bg-indigo-400/30', 'bg-purple-400/30', 'bg-pink-400/30', 'bg-blue-400/30']
      },
      'digital-sunset': {
        light: ['bg-orange-200/40', 'bg-red-200/40', 'bg-pink-200/40', 'bg-yellow-200/40'],
        dark: ['bg-orange-400/30', 'bg-red-400/30', 'bg-pink-400/30', 'bg-yellow-400/30']
      },
      'cyber-ocean': {
        light: ['bg-blue-200/40', 'bg-cyan-200/40', 'bg-teal-200/40', 'bg-indigo-200/40'],
        dark: ['bg-blue-400/30', 'bg-cyan-400/30', 'bg-teal-400/30', 'bg-indigo-400/30']
      },
      'digital-forest': {
        light: ['bg-green-200/40', 'bg-emerald-200/40', 'bg-teal-200/40', 'bg-lime-200/40'],
        dark: ['bg-green-400/30', 'bg-emerald-400/30', 'bg-teal-400/30', 'bg-lime-400/30']
      },
      'aurora-borealis': {
        light: ['bg-purple-200/40', 'bg-green-200/40', 'bg-blue-200/40', 'bg-cyan-200/40'],
        dark: ['bg-purple-400/30', 'bg-green-400/30', 'bg-blue-400/30', 'bg-cyan-400/30']
      }
    };

    return orbColors[wallpaper][theme];
  };

  const orbColors = getOrbColors();

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-cyan-300 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-1000">
        <div className={`absolute inset-0 bg-gradient-to-br ${getWallpaperStyles()} transition-all duration-300`}>
          <div className={`absolute top-20 left-20 w-32 h-32 ${orbColors[0]} rounded-full blur-xl animate-pulse transition-all duration-300`}></div>
          <div className={`absolute top-1/3 right-1/4 w-24 h-24 ${orbColors[1]} rounded-full blur-xl animate-pulse delay-1000 transition-all duration-300`}></div>
          <div className={`absolute bottom-1/4 left-1/3 w-20 h-20 ${orbColors[2]} rounded-full blur-xl animate-pulse delay-2000 transition-all duration-300`}></div>
          <div className={`absolute bottom-40 right-20 w-28 h-28 ${orbColors[3]} rounded-full blur-xl animate-pulse delay-500 transition-all duration-300`}></div>
        </div>
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
