"use client";

import { useNotifications } from '@/contexts/NotificationContext';
import NotificationToast from './NotificationToast';

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  // Only show last 3 notifications as toasts
  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col items-end">
      {recentNotifications.map(notification => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={removeNotification}
          autoClose={true}
          duration={5000}
        />
      ))}
    </div>
  );
}