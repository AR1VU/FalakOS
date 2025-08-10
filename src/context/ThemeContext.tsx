import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type Wallpaper = 'soft-pastel' | 'cosmic-dreams' | 'digital-sunset' | 'cyber-ocean' | 'digital-forest' | 'aurora-borealis';

interface ThemeContextType {
  theme: Theme;
  wallpaper: Wallpaper;
  toggleTheme: () => void;
  setWallpaper: (wallpaper: Wallpaper) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [wallpaper, setWallpaperState] = useState<Wallpaper>('cyber-ocean');

  useEffect(() => {
    const savedTheme = localStorage.getItem('falacos-theme') as Theme;
    const savedWallpaper = localStorage.getItem('falacos-wallpaper') as Wallpaper;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedWallpaper) {
      setWallpaperState(savedWallpaper);
    } else {
      // Set default wallpaper to cyber-ocean if none saved
      setWallpaperState('cyber-ocean');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('falacos-theme', newTheme);
  };

  const setWallpaper = (newWallpaper: Wallpaper) => {
    setWallpaperState(newWallpaper);
    localStorage.setItem('falacos-wallpaper', newWallpaper);
  };
  return (
    <ThemeContext.Provider value={{ theme, wallpaper, toggleTheme, setWallpaper }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};