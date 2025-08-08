import React, { createContext, useContext, useState, useCallback } from 'react';

interface Window {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  isAnimating: boolean;
  zIndex: number;
}

interface WindowContextType {
  windows: Window[];
  openWindow: (id: string, title: string, content: React.ReactNode) => void;
  closeWindow: (id: string) => void;
  updateWindow: (id: string, updates: Partial<Window>) => void;
  focusWindow: (id: string) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);

  const openWindow = useCallback((id: string, title: string, content: React.ReactNode) => {
    const existingWindow = windows.find(w => w.id === id);
    
    if (existingWindow) {
      // Focus existing window and restore if minimized
      setWindows(prev => 
        prev.map(w => 
          w.id === id 
            ? { ...w, isMinimized: false, zIndex: nextZIndex }
            : w
        )
      );
      setNextZIndex(prev => prev + 1);
      return;
    }

    const newWindow: Window = {
      id,
      title,
      content,
      position: { 
        x: Math.round((100 + Math.random() * 200) / 20) * 20, 
        y: Math.round((100 + Math.random() * 100) / 20) * 20 
      },
      size: { width: 800, height: 600 },
      isMinimized: false,
      isMaximized: false,
      isAnimating: false,
      zIndex: nextZIndex,
    };

    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  }, [windows, nextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const updateWindow = useCallback((id: string, updates: Partial<Window>) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, ...updates } : w))
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, zIndex: nextZIndex } : w))
    );
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  return (
    <WindowContext.Provider value={{
      windows,
      openWindow,
      closeWindow,
      updateWindow,
      focusWindow,
    }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindows = () => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindows must be used within a WindowProvider');
  }
  return context;
};