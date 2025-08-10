import React from 'react';
import { useWindows } from '../context/WindowContext';
import Window from './Window';

export default function WindowManager() {
  const { windows } = useWindows();

  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      {windows
        .filter(w => !w.isMinimized)
        .map(window => (
          <div key={window.id} className="pointer-events-auto">
            <Window
              id={window.id}
              title={window.title}
              x={window.x}
              y={window.y}
              width={window.width}
              height={window.height}
              isMaximized={window.isMaximized}
              zIndex={window.zIndex}
            />
          </div>
        ))}
    </div>
  );
}