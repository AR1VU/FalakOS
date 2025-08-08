import React, { useState, useEffect } from 'react';
import { Moon, Sun, Bell, Wifi, Battery, Volume2 } from 'lucide-react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WindowManager from './components/WindowManager';
import NotificationPanel from './components/NotificationPanel';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { WindowProvider } from './context/WindowContext';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <WindowProvider>
      <div className={`min-h-screen transition-all duration-500 ${theme === 'dark' ? 'dark' : ''}`}>
        {/* Desktop Background */}
        <Desktop />
        
        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-4">
          {/* Left side - empty for now */}
          <div></div>
          
          {/* Right side - Controls */}
          <div className="flex items-center gap-3">
            {/* System Status */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full border border-white/20">
              <Wifi className="w-4 h-4 text-white/80" />
              <Battery className="w-4 h-4 text-green-400" />
              <Volume2 className="w-4 h-4 text-white/80" />
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-purple-300" />
              )}
            </button>
            
            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105 relative"
            >
              <Bell className="w-5 h-5 text-white/80" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            
            {/* User Avatar */}
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white/30 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                F
              </div>
            </div>
          </div>
        </div>
        
        {/* Window Manager */}
        <WindowManager />
        
        {/* Taskbar */}
        <Taskbar />
        
        {/* Notification Panel */}
        <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      </div>
    </WindowProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;