import React, { useState } from 'react';
import { User, Settings, Palette, Moon, Sun, LogOut, Edit, Camera } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface UserProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfilePanel: React.FC<UserProfilePanelProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const [selectedWallpaper, setSelectedWallpaper] = useState('gradient');

  const wallpapers = [
    { id: 'gradient', name: 'Cosmic Gradient', preview: 'from-purple-400 via-pink-300 to-cyan-300' },
    { id: 'neon', name: 'Neon Dreams', preview: 'from-pink-500 via-purple-500 to-indigo-500' },
    { id: 'sunset', name: 'Digital Sunset', preview: 'from-orange-400 via-red-400 to-pink-400' },
    { id: 'ocean', name: 'Cyber Ocean', preview: 'from-blue-400 via-cyan-400 to-teal-400' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      
      {/* Panel */}
      <div
        className={`fixed top-20 right-6 w-80 bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 shadow-2xl z-50 rounded-3xl transform transition-all duration-500 ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl border-2 border-white/30 flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg">
                F
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500/80 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/30">
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold text-lg">FalakUser</h3>
                <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-white/60" />
                </button>
              </div>
              <p className="text-white/60 text-sm">falak@falacos.dev</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="p-6 space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-200">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-purple-400" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
              <div>
                <span className="text-white font-medium text-sm">Theme</span>
                <p className="text-white/60 text-xs">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                theme === 'dark' ? 'bg-purple-500/30' : 'bg-yellow-500/30'
              } border border-white/20`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 shadow-lg ${
                  theme === 'dark'
                    ? 'left-0.5 bg-purple-400'
                    : 'left-6 bg-yellow-400'
                }`}
              />
            </button>
          </div>

          {/* Wallpaper Section */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-medium text-sm">Wallpaper</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {wallpapers.map((wallpaper) => (
                <button
                  key={wallpaper.id}
                  onClick={() => setSelectedWallpaper(wallpaper.id)}
                  className={`relative h-16 rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedWallpaper === wallpaper.id
                      ? 'ring-2 ring-white/40 ring-offset-2 ring-offset-transparent'
                      : ''
                  }`}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${wallpaper.preview}`} />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white text-xs font-medium text-center px-2">
                      {wallpaper.name}
                    </span>
                  </div>
                  {selectedWallpaper === wallpaper.id && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full shadow-lg" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all duration-200 hover:scale-105">
              <Settings className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium text-sm">System Settings</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 bg-red-500/10 hover:bg-red-500/20 rounded-2xl border border-red-400/20 transition-all duration-200 hover:scale-105">
              <LogOut className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium text-sm">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-white/5 rounded-b-3xl">
          <div className="text-center">
            <p className="text-white/40 text-xs">FalakOS v2.1.3</p>
            <p className="text-white/40 text-xs mt-1">© 2024 Falak Technologies</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePanel;