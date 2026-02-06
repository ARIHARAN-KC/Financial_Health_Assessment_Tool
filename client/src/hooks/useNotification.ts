"use client";

import { useNotifications } from '@/contexts/NotificationContext';

export function useNotification() {
  const { addNotification } = useNotifications();

  const showSuccess = (message: string, title: string = 'Success') => {
    addNotification('success', title, message);
  };

  const showError = (message: string, title: string = 'Error') => {
    addNotification('error', title, message);
  };

  const showWarning = (message: string, title: string = 'Warning') => {
    addNotification('warning', title, message);
  };

  const showInfo = (message: string, title: string = 'Info') => {
    addNotification('info', title, message);
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
}