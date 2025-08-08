import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  icon?: React.ComponentType<any>;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Welcome to FalakOS',
      message: 'Your futuristic desktop experience is ready!',
      type: 'success',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      read: false,
    },
    {
      id: '2',
      title: 'System Update Available',
      message: 'FalakOS v2.1.4 is ready to install',
      type: 'info',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
    },
    {
      id: '3',
      title: 'New App Installed',
      message: 'Calculator app has been successfully installed',
      type: 'success',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      read: true,
    },
    {
      id: '4',
      title: 'Storage Warning',
      message: 'Your storage is 85% full. Consider cleaning up files.',
      type: 'warning',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
    },
  ]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      markAsRead,
      clearAllNotifications,
      unreadCount,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};