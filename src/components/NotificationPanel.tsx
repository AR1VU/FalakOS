import React from 'react';
import { Bell, X, Calendar, Mail, Download, Wifi, CheckCircle, AlertTriangle, Info, AlertCircle, Trash2 } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, removeNotification, markAsRead, clearAllNotifications, unreadCount } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'error':
        return AlertCircle;
      default:
        return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'from-green-400 to-green-600';
      case 'warning':
        return 'from-yellow-400 to-orange-500';
      case 'error':
        return 'from-red-400 to-red-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      
      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white/10 dark:bg-black/20 backdrop-blur-2xl border-l border-white/20 shadow-2xl z-50 transform transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-white" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-white text-xl font-semibold">Notifications</h2>
              <p className="text-white/60 text-sm">{notifications.length} total, {unreadCount} unread</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-2xl transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/10"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
        
        {/* Clear All Button */}
        {notifications.length > 0 && (
          <div className="p-4 border-b border-white/10">
            <button
              onClick={clearAllNotifications}
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 rounded-2xl text-red-400 text-sm font-medium transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-red-400/20"
            >
              <Trash2 className="w-4 h-4" />
              Clear All Notifications
            </button>
          </div>
        )}
        
        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <Bell className="w-16 h-16 text-white/20 mb-4" />
              <h3 className="text-white/60 text-lg font-medium mb-2">No notifications</h3>
              <p className="text-white/40 text-sm">You're all caught up!</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const colorClass = getNotificationColor(notification.type);
                
                return (
                  <div
                    key={notification.id}
                    className={`relative p-4 rounded-2xl border transition-all duration-200 hover:scale-105 cursor-pointer group ${
                      notification.read
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-white/10 border-white/20 hover:bg-white/15 shadow-lg'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className="absolute top-3 right-3 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg" />
                    )}
                    
                    <div className="flex items-start gap-3">
                      <div className={`p-2 bg-gradient-to-br ${colorClass} rounded-2xl backdrop-blur-sm shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm mb-1 ${notification.read ? 'text-white/70' : 'text-white'}`}>
                          {notification.title}
                        </h3>
                        <p className={`text-xs leading-relaxed mb-2 ${notification.read ? 'text-white/50' : 'text-white/70'}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-white/40 text-xs font-mono">
                            {formatTime(notification.timestamp)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded-lg transition-all duration-200 hover:scale-110"
                          >
                            <X className="w-3 h-3 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pixel-art inspired border effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Footer with system info */}
        <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="text-center">
            <p className="text-white/40 text-xs">Notification Center</p>
            <p className="text-white/30 text-xs mt-1">FalakOS v2.1.3</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;