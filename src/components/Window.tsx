import React, { useRef, useState } from 'react';
import { X, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { useWindows } from '../context/WindowContext';
import NotesApp from './apps/NotesApp';
import CalculatorApp from './apps/CalculatorApp';
import FilesApp from './apps/FilesApp';

interface WindowProps {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMaximized: boolean;
  zIndex: number;
}

export default function Window({ id, title, x, y, width, height, isMaximized, zIndex }: WindowProps) {
  const { closeWindow, setWindowPosition, setWindowSize, minimizeWindow, maximizeWindow, focusWindow } = useWindows();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ mouseX: 0, mouseY: 0, windowX: 0, windowY: 0 });
  const [resizeStart, setResizeStart] = useState({ mouseX: 0, mouseY: 0, width: 0, height: 0, type: '' });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) return;

    // If maximized, restore window on drag attempt
    if (isMaximized) {
      maximizeWindow(id);
      return;
    }

    setDragStart({
      mouseX: e.clientX,
      mouseY: e.clientY,
      windowX: x,
      windowY: y
    });
    setIsDragging(true);
    focusWindow(id);

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(0, Math.min(window.innerWidth - width, dragStart.windowX + (e.clientX - dragStart.mouseX)));
      const newY = Math.max(60, Math.min(window.innerHeight - height - 120, dragStart.windowY + (e.clientY - dragStart.mouseY)));
      setWindowPosition(id, newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeStart = (e: React.MouseEvent, type: string) => {
    e.stopPropagation();
    setResizeStart({
      mouseX: e.clientX,
      mouseY: e.clientY,
      width,
      height,
      type
    });
    setIsResizing(true);
    focusWindow(id);

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.mouseX;
      const deltaY = e.clientY - resizeStart.mouseY;
      
      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newX = x;
      let newY = y;

      if (type.includes('right')) {
        newWidth = Math.max(300, resizeStart.width + deltaX);
      }
      if (type.includes('left')) {
        newWidth = Math.max(300, resizeStart.width - deltaX);
        newX = x - (newWidth - width);
      }
      if (type.includes('bottom')) {
        newHeight = Math.max(200, resizeStart.height + deltaY);
      }
      if (type.includes('top')) {
        newHeight = Math.max(200, resizeStart.height - deltaY);
        newY = y - (newHeight - height);
      }

      setWindowSize(id, newWidth, newHeight);
      if (newX !== x || newY !== y) {
        setWindowPosition(id, newX, newY);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const renderContent = () => {
    if (id.includes('notes')) return <NotesApp />;
    if (id.includes('calculator')) return <CalculatorApp />;
    if (id.includes('files')) return <FilesApp />;
    return <div className="p-6 text-white">App content for {title}</div>;
  };

  return (
    <div
      ref={windowRef}
      className="absolute select-none"
      style={{
        left: x,
        top: y,
        width,
        height,
        zIndex: isMaximized ? 9999 : zIndex,
        transform: isDragging ? 'scale(1.02) rotate(1deg)' : 'scale(1)',
        transition: isDragging || isResizing ? 'none' : 'transform 0.2s ease'
      }}
      onClick={() => focusWindow(id)}
    >
      <div className={`w-full h-full bg-white/5 dark:bg-black/10 backdrop-blur-2xl border shadow-2xl ${
        isMaximized ? 'rounded-none' : 'rounded-3xl'
      } ${isDragging ? 'border-purple-400/40 shadow-purple-500/20' : 'border-white/10'}`}>
        
        {/* Window Header - Always visible */}
        <div
          className={`flex items-center justify-between p-5 border-b border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-200 ${
            isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
          }`}
          onMouseDown={handleDragStart}
        >
          <div className="flex items-center gap-4 flex-1 pointer-events-none">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-400/80 rounded-full" />
              <div className="w-3 h-3 bg-yellow-400/80 rounded-full" />
              <div className="w-3 h-3 bg-green-400/80 rounded-full" />
            </div>
            <h2 className="text-white font-semibold text-lg">{title}</h2>
          </div>
          
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => minimizeWindow(id)}
              className="w-8 h-8 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 border border-yellow-400/30"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => maximizeWindow(id)}
              className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 border border-green-400/30"
            >
              {isMaximized ? <RotateCcw className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => closeWindow(id)}
              className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 border border-red-400/30"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Window Content - Fixed height */}
        <div className="h-[calc(100%-80px)] overflow-hidden">
          {renderContent()}
        </div>

        {!isMaximized && (
          <>
            <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize" onMouseDown={(e) => handleResizeStart(e, 'top-left')} />
            <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize" onMouseDown={(e) => handleResizeStart(e, 'top-right')} />
            <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize" onMouseDown={(e) => handleResizeStart(e, 'bottom-left')} />
            <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize" onMouseDown={(e) => handleResizeStart(e, 'bottom-right')} />
            <div className="absolute top-0 left-4 right-4 h-2 cursor-n-resize" onMouseDown={(e) => handleResizeStart(e, 'top')} />
            <div className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize" onMouseDown={(e) => handleResizeStart(e, 'bottom')} />
            <div className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize" onMouseDown={(e) => handleResizeStart(e, 'left')} />
            <div className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize" onMouseDown={(e) => handleResizeStart(e, 'right')} />
          </>
        )}
      </div>
    </div>
  );
}