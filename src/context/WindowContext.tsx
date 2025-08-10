import React, { createContext, useContext, useState } from 'react';

interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowContextType {
  windows: WindowState[];
  createWindow: (id: string, title: string, content: React.ReactNode) => void;
  closeWindow: (id: string) => void;
  setWindowPosition: (id: string, x: number, y: number) => void;
  setWindowSize: (id: string, width: number, height: number) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  // Legacy methods for compatibility
  openWindow: (id: string, title: string, content: React.ReactNode) => void;
  updateWindow: (id: string, updates: Partial<WindowState>) => void;
}

const WindowContext = createContext<WindowContextType | null>(null);

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [highestZ, setHighestZ] = useState(100);

  const createWindow = (id: string, title: string, content: React.ReactNode) => {
    const existing = windows.find(w => w.id === id);
    if (existing) {
      if (existing.isMinimized) {
        setWindows(prev => prev.map(w => 
          w.id === id ? { ...w, isMinimized: false, zIndex: highestZ + 1 } : w
        ));
        setHighestZ(prev => prev + 1);
      }
      return;
    }

    const newWindow: WindowState = {
      id,
      title,
      content,
      x: 100 + Math.random() * 400,
      y: 100 + Math.random() * 200,
      width: 800,
      height: 600,
      isMinimized: false,
      isMaximized: false,
      zIndex: highestZ + 1
    };

    setWindows(prev => [...prev, newWindow]);
    setHighestZ(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const setWindowPosition = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, x, y } : w
    ));
  };

  const setWindowSize = (id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, width, height } : w
    ));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        if (w.isMaximized) {
          return {
            ...w,
            isMaximized: false,
            x: 100 + Math.random() * 300,
            y: 100 + Math.random() * 200,
            width: 800,
            height: 600
          };
        } else {
          return {
            ...w,
            isMaximized: true,
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight
          };
        }
      }
      return w;
    }));
  };

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: highestZ + 1 } : w
    ));
    setHighestZ(prev => prev + 1);
  };

  // Legacy methods for compatibility
  const openWindow = createWindow;
  
  const updateWindow = (id: string, updates: Partial<WindowState>) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, ...updates } : w
    ));
  };

  return (
    <WindowContext.Provider value={{
      windows,
      createWindow,
      closeWindow,
      setWindowPosition,
      setWindowSize,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      openWindow,
      updateWindow
    }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindows must be used within WindowProvider');
  }
  return context;
}