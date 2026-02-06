"use client";

import { useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const getNotificationStyles = (type: string) => {
  switch (type) {
    case 'success':
      return {
        bg: 'bg-linear-to-r from-green-900/90 to-emerald-900/90',
        border: 'border-green-800/50',
        icon: CheckCircle,
        iconColor: 'text-green-400'
      };
    case 'error':
      return {
        bg: 'bg-linear-to-r from-red-900/90 to-pink-900/90',
        border: 'border-red-800/50',
        icon: AlertCircle,
        iconColor: 'text-red-400'
      };
    case 'warning':
      return {
        bg: 'bg-linear-to-r from-yellow-900/90 to-orange-900/90',
        border: 'border-yellow-800/50',
        icon: AlertTriangle,
        iconColor: 'text-yellow-400'
      };
    default:
      return {
        bg: 'bg-linear-to-r from-blue-900/90 to-cyan-900/90',
        border: 'border-blue-800/50',
        icon: Info,
        iconColor: 'text-blue-400'
      };
  }
};

interface NotificationToastProps {
  notification: {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
  };
  onClose: (id: string) => void;
  autoClose?: boolean;
  duration?: number;
}

export default function NotificationToast({
  notification,
  onClose,
  autoClose = true,
  duration = 5000
}: NotificationToastProps) {
  const styles = getNotificationStyles(notification.type);
  const Icon = styles.icon;

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose(notification.id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, notification.id, onClose]);

  return (
    <div className={`${styles.bg} backdrop-blur-lg border ${styles.border} rounded-xl p-4 shadow-2xl shadow-black/30 mb-3 min-w-[320px] max-w-md animate-in slide-in-from-right-full duration-300`}>
      <div className="flex items-start">
        <div className={`p-2 rounded-lg bg-white/5 mr-3`}>
          <Icon className={`w-5 h-5 ${styles.iconColor}`} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-white mb-1">{notification.title}</h4>
            <button
              onClick={() => onClose(notification.id)}
              className="ml-2 text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-300 text-sm">{notification.message}</p>
        </div>
      </div>
      
      {/* Progress bar for auto-close */}
      {autoClose && (
        <div className="mt-3 h-0.5 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-white/30 to-white/10 animate-progress"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </div>
  );
}