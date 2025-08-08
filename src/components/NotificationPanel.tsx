import React from 'react';
import { Bell, X, Calendar, Mail, Download, Wifi } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      icon: Mail,
      title: 'New Message',
      description: 'You have 3 unread messages',
      time: '2m ago',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 2,
      icon: Download,
      title: 'Download Complete',
      description: 'FalakOS Update v2.1.3',
      time: '5m ago',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 3,
      icon: Calendar,
      title: 'Meeting Reminder',
      description: 'Team standup in 15 minutes',
      time: '10m ago',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 4,
      icon: Wifi,
      title: 'Network Connected',
      description: 'Connected to FalakNet-5G',
      time: '1h ago',
      color: 'from-cyan-400 to-cyan-600'
    }
  ];

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
        className={`fixed top-0 right-0 h-full w-80 bg-white/10 dark:bg-black/20 backdrop-blur-xl border-l border-white/20 shadow-2xl z-50 transform transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-white" />
            <h2 className="text-white text-xl font-semibold">Notifications</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
        
        {/* Notifications List */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-100px)]">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className="p-4 bg-white/5 dark:bg-black/10 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 bg-gradient-to-br ${notification.color} rounded-full`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm">{notification.title}</h3>
                    <p className="text-white/60 text-xs mt-1 line-clamp-2">{notification.description}</p>
                    <span className="text-white/40 text-xs mt-2 block">{notification.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm font-medium transition-colors">
            Clear All Notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;