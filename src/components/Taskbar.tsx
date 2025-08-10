import React, { useState, useEffect } from 'react';
import { Calculator, FileText, Folder, Home, Settings, User, Moon, Sun } from 'lucide-react';
import { useWindows } from '../context/WindowContext';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';

const Taskbar: React.FC = () => {
  const { createWindow, windows } = useWindows();
  const { theme, toggleTheme } = useTheme();
  const { addNotification } = useNotifications();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [clickedApp, setClickedApp] = useState<string | null>(null);
  const [isTaskbarVisible, setIsTaskbarVisible] = useState(true);

  // Check if any window is maximized
  const hasMaximizedWindow = windows.some(w => w.isMaximized && !w.isMinimized);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-hide taskbar when window is maximized
  useEffect(() => {
    if (hasMaximizedWindow) {
      setIsTaskbarVisible(false);
    } else {
      setIsTaskbarVisible(true);
    }
  }, [hasMaximizedWindow]);

  // Show taskbar on mouse hover near bottom
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hasMaximizedWindow) {
        const bottomThreshold = window.innerHeight - 50;
        if (e.clientY > bottomThreshold) {
          setIsTaskbarVisible(true);
        } else if (e.clientY < bottomThreshold - 100) {
          setIsTaskbarVisible(false);
        }
      }
    };

    if (hasMaximizedWindow) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [hasMaximizedWindow]);

  const apps = [
    { 
      id: 'notes', 
      name: 'Notes', 
      icon: FileText, 
      color: 'from-yellow-300 to-orange-400',
      hoverColor: 'from-yellow-200 to-orange-300'
    },
    { 
      id: 'calculator', 
      name: 'Calculator', 
      icon: Calculator, 
      color: 'from-blue-300 to-purple-400',
      hoverColor: 'from-blue-200 to-purple-300'
    },
    { 
      id: 'files', 
      name: 'Files', 
      icon: Folder, 
      color: 'from-green-300 to-teal-400',
      hoverColor: 'from-green-200 to-teal-300'
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: Settings, 
      color: 'from-gray-300 to-slate-400',
      hoverColor: 'from-gray-200 to-slate-300'
    },
  ];

  const handleAppClick = (app: any) => {
    setClickedApp(app.id);
    
    setTimeout(() => setClickedApp(null), 200);
    
    createWindow(app.id, app.name, <div>App content for {app.name}</div>);
    
    addNotification({
      title: `${app.name} Opened`,
      message: `${app.name} application has been launched successfully`,
      type: 'success'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <>
      {/* Tooltip */}
      {hoveredApp && isTaskbarVisible && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-60 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-white/20">
            {apps.find(app => app.id === hoveredApp)?.name}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Taskbar */}
      <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        isTaskbarVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <div className="flex items-center gap-6 px-8 py-5 bg-white/10 dark:bg-black/20 backdrop-blur-2xl rounded-[2rem] border border-white/20 shadow-2xl transition-all duration-500 min-w-[600px]">
          
          {/* Left Side - App Icons */}
          <div className="flex items-center gap-5">
            {/* Home Button */}
            <button 
              className="relative p-5 bg-gradient-to-br from-purple-300/80 to-pink-400/80 dark:from-purple-400/80 dark:to-pink-500/80 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group backdrop-blur-sm"
              onMouseEnter={() => setHoveredApp('home')}
              onMouseLeave={() => setHoveredApp(null)}
            >
              <Home className="w-7 h-7 text-white drop-shadow-sm" />
              <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            {/* Divider */}
            <div className="w-px h-14 bg-gradient-to-b from-transparent via-white/30 to-transparent mx-3"></div>
            
            {/* App Icons */}
            {apps.map((app) => {
              const Icon = app.icon;
              const isOpen = windows.some(w => w.id.includes(app.id) && !w.isMinimized);
              const isClicked = clickedApp === app.id;
              const isHovered = hoveredApp === app.id;
              
              return (
                <div key={app.id} className="relative">
                  <button
                    onClick={() => handleAppClick(app)}
                    onMouseEnter={() => setHoveredApp(app.id)}
                    onMouseLeave={() => setHoveredApp(null)}
                    className={`relative p-5 bg-gradient-to-br ${isHovered ? app.hoverColor : app.color} rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group backdrop-blur-sm ${
                      isClicked ? 'animate-bounce scale-95' : isHovered ? 'scale-110 -translate-y-1' : 'scale-100'
                    } ${isOpen ? 'ring-2 ring-white/40 ring-offset-2 ring-offset-transparent' : ''}`}
                  >
                    <Icon className="w-7 h-7 text-white drop-shadow-sm" />
                    <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Glow effect for open apps */}
                    {isOpen && (
                      <div className="absolute inset-0 bg-white/10 rounded-3xl animate-pulse"></div>
                    )}
                  </button>
                  
                  {/* Active indicator dot */}
                  {isOpen && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Divider */}
          <div className="w-px h-14 bg-gradient-to-b from-transparent via-white/30 to-transparent mx-4"></div>
          
          {/* Right Side - System Controls */}
          <div className="flex items-center gap-5">
            {/* Digital Clock */}
            <div className="px-6 py-4 bg-white/10 dark:bg-black/20 rounded-3xl border border-white/20 shadow-inner backdrop-blur-sm">
              <div className="text-center">
                <div className="text-white font-semibold text-lg font-mono leading-none">
                  {formatTime(currentTime)}
                </div>
                <div className="text-white/60 text-xs font-mono mt-1">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-5 bg-gradient-to-br from-indigo-300/80 to-purple-400/80 dark:from-indigo-400/80 dark:to-purple-500/80 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group overflow-hidden backdrop-blur-sm"
              onMouseEnter={() => setHoveredApp('theme')}
              onMouseLeave={() => setHoveredApp(null)}
            >
              <div className="relative z-10">
                {theme === 'dark' ? (
                  <Sun className="w-7 h-7 text-white drop-shadow-sm" />
                ) : (
                  <Moon className="w-7 h-7 text-white drop-shadow-sm" />
                )}
              </div>
              <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Animated background for theme toggle */}
              <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-500 rounded-3xl ${
                theme === 'dark' 
                  ? 'from-yellow-400/20 to-orange-400/20' 
                  : 'from-blue-400/20 to-purple-400/20'
              }`}></div>
            </button>
            
            {/* Avatar Button */}
            <button 
              className="relative p-5 bg-gradient-to-br from-pink-300/80 to-rose-400/80 dark:from-pink-400/80 dark:to-rose-500/80 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group backdrop-blur-sm"
              onMouseEnter={() => setHoveredApp('profile')}
              onMouseLeave={() => setHoveredApp(null)}
            >
              <User className="w-7 h-7 text-white drop-shadow-sm" />
              <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Profile indicator */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400/90 rounded-full border-2 border-white shadow-sm backdrop-blur-sm">
                <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
              </div>
            </button>
          </div>
        </div>
        
        {/* Subtle glow effect under taskbar */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-[2rem] blur-2xl -z-10 scale-110"></div>
      </div>

      {/* Invisible bottom trigger for auto-show */}
      {hasMaximizedWindow && (
        <div 
          className="fixed bottom-0 left-0 right-0 h-2 z-40"
          onMouseEnter={() => setIsTaskbarVisible(true)}
        />
      )}
    </>
  );
};

export default Taskbar;