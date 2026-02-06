"use client";

import { useNotification } from '@/hooks/useNotification';

export const notify = {
    success: (message: string, title?: string) => {
        console.log('Success:', message);
    },

    error: (message: string, title?: string) => {
        console.log('Error:', message);
    },

    warning: (message: string, title?: string) => {
        console.log('Warning:', message);
    },

    info: (message: string, title?: string) => {
        console.log('Info:', message);
    },
};

// React hook version
export function useNotify() {
    const notification = useNotification();

    return {
        success: (message: string, title: string = 'Success') => {
            notification.showSuccess(message, title);
        },

        error: (message: string, title: string = 'Error') => {
            notification.showError(message, title);
        },

        warning: (message: string, title: string = 'Warning') => {
            notification.showWarning(message, title);
        },

        info: (message: string, title: string = 'Info') => {
            notification.showInfo(message, title);
        },
    };
}