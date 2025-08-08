import React, { useState, useEffect } from 'react';
import { Moon, Sun, Bell, Wifi, Battery, Volume2, User } from 'lucide-react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WindowManager from './components/WindowManager';
import NotificationPanel from './components/NotificationPanel';
import UserProfilePanel from './components/UserProfilePanel';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { WindowProvider } from './context/WindowContext';
import { NotificationProvider, useNotifications } from './context/NotificationContext';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

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
              className="relative p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105"
            >
              <Bell className="w-5 h-5 text-white/80" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse px-1">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            {/* User Avatar */}
            <button
              onClick={() => setShowUserProfile(!showUserProfile)}
              className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white/30 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden relative group"
            >
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                F
              </div>
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Online status indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm">
                <div className="w-full h-full bg-green-400 rounded-full animate-ping" />
              </div>
            </button>
          </div>
        </div>
        
        {/* Window Manager */}
        <WindowManager />
        
        {/* Taskbar */}
        <Taskbar />
        
        {/* Notification Panel */}
        <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
        
        {/* User Profile Panel */}
        <UserProfilePanel isOpen={showUserProfile} onClose={() => setShowUserProfile(false)} />
      </div>
    </WindowProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <WindowProvider>
          <AppContent />
        </WindowProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;