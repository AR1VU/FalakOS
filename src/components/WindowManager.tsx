import React from 'react';
import { useWindows } from '../context/WindowContext';
import Window from './Window';

const WindowManager: React.FC = () => {
  const { windows } = useWindows();

  return (
    <div className="fixed inset-0 z-30">
      {windows.map((window, index) => (
        <Window
          key={window.id}
          window={window}
          zIndex={30 + index}
        />
      ))}
    </div>
  );
};

export default WindowManager;