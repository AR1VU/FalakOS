import React, { useState, useRef, useCallback, useEffect } from 'react';
import { X, Maximize2, Minimize2, Move, RotateCcw } from 'lucide-react';
import { useWindows } from '../context/WindowContext';
import NotesApp from './apps/NotesApp';
import CalculatorApp from './apps/CalculatorApp';
import FilesApp from './apps/FilesApp';

interface WindowProps {
  window: {
    id: string;
    title: string;
    content: React.ReactNode;
    position: { x: number; y: number };
    size: { width: number; height: number };
    isMinimized: boolean;
    isMaximized: boolean;
    isAnimating: boolean;
  };
  zIndex: number;
}

const GRID_SIZE = 20;
const MIN_WIDTH = 300;
const MIN_HEIGHT = 200;

const Window: React.FC<WindowProps> = ({ window, zIndex }) => {
  const { closeWindow, updateWindow, focusWindow } = useWindows();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const snapToGrid = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target !== e.currentTarget && !(e.target as HTMLElement).closest('.window-header')) {
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    
    setIsDragging(true);
    focusWindow(window.id);
  }, [window.id, focusWindow]);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: window.size.width,
      height: window.size.height,
    });
    
    focusWindow(window.id);
  }, [window.id, window.size, focusWindow]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      
      const newX = snapToGrid(Math.max(0, Math.min(window.innerWidth - 300, e.clientX - dragOffset.x)));
      const newY = snapToGrid(Math.max(0, Math.min(window.innerHeight - 200, e.clientY - dragOffset.y)));
      
      updateWindow(window.id, {
        position: { x: newX, y: newY }
      });
    } else if (isResizing) {
      e.preventDefault();
      
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      
      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newX = window.position.x;
      let newY = window.position.y;
      
      if (resizeDirection.includes('right')) {
        newWidth = Math.max(MIN_WIDTH, resizeStart.width + deltaX);
      }
      if (resizeDirection.includes('left')) {
        newWidth = Math.max(MIN_WIDTH, resizeStart.width - deltaX);
        newX = window.position.x + (resizeStart.width - newWidth);
      }
      if (resizeDirection.includes('bottom')) {
        newHeight = Math.max(MIN_HEIGHT, resizeStart.height + deltaY);
      }
      if (resizeDirection.includes('top')) {
        newHeight = Math.max(MIN_HEIGHT, resizeStart.height - deltaY);
        newY = window.position.y + (resizeStart.height - newHeight);
      }
      
      // Snap to grid
      newWidth = snapToGrid(newWidth);
      newHeight = snapToGrid(newHeight);
      newX = snapToGrid(newX);
      newY = snapToGrid(newY);
      
      updateWindow(window.id, {
        size: { width: newWidth, height: newHeight },
        position: { x: newX, y: newY }
      });
    }
  }, [isDragging, isResizing, dragOffset, resizeStart, resizeDirection, window.id, window.position, updateWindow]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection('');
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const handleMinimize = () => {
    updateWindow(window.id, { isMinimized: true, isAnimating: true });
    setTimeout(() => {
      updateWindow(window.id, { isAnimating: false });
    }, 300);
  };

  const handleMaximize = () => {
    updateWindow(window.id, { isAnimating: true });
    
    setTimeout(() => {
      if (window.isMaximized) {
        // Restore to original size
        updateWindow(window.id, { 
          isMaximized: false,
          position: { x: snapToGrid(100 + Math.random() * 200), y: snapToGrid(100 + Math.random() * 100) },
          size: { width: 800, height: 600 },
          isAnimating: false
        });
      } else {
        // Maximize
        updateWindow(window.id, { 
          isMaximized: true,
          position: { x: 0, y: 0 },
          size: { width: window.innerWidth, height: window.innerHeight - 120 },
          isAnimating: false
        });
      }
    }, 150);
  };

  const handleClose = () => {
    updateWindow(window.id, { isAnimating: true });
    setTimeout(() => {
      closeWindow(window.id);
    }, 200);
  };

  const renderAppContent = () => {
    if (window.id.includes('notes')) return <NotesApp />;
    if (window.id.includes('calculator')) return <CalculatorApp />;
    if (window.id.includes('files')) return <FilesApp />;
    return window.content;
  };

  if (window.isMinimized && !window.isAnimating) return null;

  const ResizeHandle: React.FC<{ direction: string; className: string }> = ({ direction, className }) => (
    <div
      className={`absolute ${className} group`}
      onMouseDown={(e) => handleResizeMouseDown(e, direction)}
    >
      <div className="w-full h-full group-hover:bg-white/20 transition-colors" />
    </div>
  );

  return (
    <div
      ref={windowRef}
      className={`absolute select-none transition-all duration-300 ${
        window.isAnimating ? 'animate-pulse' : ''
      } ${
        window.isMinimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
      } ${
        isDragging ? 'cursor-grabbing z-50' : 'cursor-default'
      }`}
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: isDragging ? 9999 : zIndex,
        transform: isDragging ? 'rotate(1deg) scale(1.02)' : 'rotate(0deg) scale(1)',
      }}
      onClick={() => focusWindow(window.id)}
    >
      {/* Window Container with Glassmorphism */}
      <div className={`w-full h-full bg-white/5 dark:bg-black/10 backdrop-blur-2xl rounded-3xl border shadow-2xl transition-all duration-300 ${
        isDragging ? 'border-purple-400/40 shadow-purple-500/20' : 'border-white/10'
      } ${
        window.isMaximized ? 'rounded-none' : 'rounded-3xl'
      }`}>
        
        {/* Pixel-art inspired header */}
        <div
          className={`window-header flex items-center justify-between p-5 border-b cursor-grab active:cursor-grabbing transition-all duration-200 backdrop-blur-sm ${
            isDragging ? 'border-purple-400/40 bg-purple-500/10' : 'border-white/10 bg-white/5'
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-4 pointer-events-none">
            
            <h2 className="text-white font-semibold text-lg">{window.title}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleMinimize}
              className="w-8 h-8 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 border border-yellow-400/30 backdrop-blur-sm"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleMaximize}
              className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 border border-green-400/30 backdrop-blur-sm"
            >
              {window.isMaximized ? (
                <RotateCcw className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
            
            <button
              onClick={handleClose}
              className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 border border-red-400/30 backdrop-blur-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Window Content */}
        <div className="h-[calc(100%-80px)] overflow-hidden">
          {renderAppContent()}
        </div>
        
        {/* Resize Handles */}
        {!window.isMaximized && (
          <>
            {/* Corner handles */}
            <ResizeHandle direction="top-left" className="top-0 left-0 w-3 h-3 cursor-nw-resize" />
            <ResizeHandle direction="top-right" className="top-0 right-0 w-3 h-3 cursor-ne-resize" />
            <ResizeHandle direction="bottom-left" className="bottom-0 left-0 w-3 h-3 cursor-sw-resize" />
            <ResizeHandle direction="bottom-right" className="bottom-0 right-0 w-3 h-3 cursor-se-resize" />
            
            {/* Edge handles */}
            <ResizeHandle direction="top" className="top-0 left-3 right-3 h-1 cursor-n-resize" />
            <ResizeHandle direction="bottom" className="bottom-0 left-3 right-3 h-1 cursor-s-resize" />
            <ResizeHandle direction="left" className="left-0 top-3 bottom-3 w-1 cursor-w-resize" />
            <ResizeHandle direction="right" className="right-0 top-3 bottom-3 w-1 cursor-e-resize" />
          </>
        )}
      </div>
    </div>
  );
};

export default Window;