"use client";

import { useState } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import {
  Bell,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCheck,
  Trash2,
  Filter,
  Clock,
  Search,
  X,
} from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-green-500/20';
      case 'error':
        return 'bg-gradient-to-r from-red-500/5 to-pink-500/5 border-red-500/20';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500/5 to-orange-500/5 border-yellow-500/20';
      default:
        return 'bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border-blue-500/20';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    // Apply type filter
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'read' && !notification.read) return false;
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        notification.title.toLowerCase().includes(searchLower) ||
        notification.message.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-gray-900 via-gray-900 to-gray-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl">
                <Bell className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Notifications</h1>
                <p className="text-gray-400">
                  {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-400 rounded-lg hover:border-green-500/40 hover:bg-green-500/20 transition-colors flex items-center gap-2"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark all as read
                </button>
              )}
              
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 text-red-400 rounded-lg hover:border-red-500/40 hover:bg-red-500/20 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="glass rounded-2xl p-6 border border-gray-800/50 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 p-3 glass border border-gray-700/50 rounded-xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="w-4 h-4 text-gray-500 hover:text-gray-300 transition-colors" />
                </button>
              )}
            </div>

            {/* Filter buttons */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter:
              </span>
              <div className="flex space-x-1">
                {['all', 'unread', 'read'].map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType as any)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      filter === filterType
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-white'
                        : 'bg-gray-900/50 border border-gray-700/50 text-gray-400 hover:border-cyan-500/30 hover:text-white'
                    }`}
                  >
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="glass rounded-2xl border border-gray-800/50 overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-full flex items-center justify-center">
                <Bell className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No notifications</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                {searchTerm || filter !== 'all'
                  ? 'No notifications match your filters.'
                  : 'All caught up! You have no notifications at the moment.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-800/50">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-900/30 transition-colors duration-200 ${
                    !notification.read ? 'bg-gray-900/20' : ''
                  }`}
                >
                  <div className="flex items-start">
                    {/* Notification Icon */}
                    <div className="p-3 rounded-lg bg-gradient-to-br from-gray-900 to-black border border-gray-800 mr-4">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Notification Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white">{notification.title}</h3>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                            )}
                          </div>
                          <p className="text-gray-300">{notification.message}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-gray-500 text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 mt-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                          >
                            <CheckCheck className="w-3 h-3" />
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="text-sm text-gray-500 hover:text-red-400 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {notifications.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-white">{notifications.length}</p>
              <p className="text-gray-400 text-sm">Total</p>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-white">{unreadCount}</p>
              <p className="text-gray-400 text-sm">Unread</p>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-white">
                {notifications.filter(n => n.type === 'success').length}
              </p>
              <p className="text-gray-400 text-sm">Success</p>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-white">
                {notifications.filter(n => n.type === 'error').length}
              </p>
              <p className="text-gray-400 text-sm">Errors</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}