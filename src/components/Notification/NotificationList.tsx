import React from 'react';
import { X } from 'lucide-react';
import { useNotification } from './NotificationContext';

export function NotificationList() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`flex items-center justify-between p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-500 ease-in-out ${
            notification.type === 'success' ? 'bg-green-100 text-green-800' :
            notification.type === 'error' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}
        >
          <p className="flex-1 mr-2">{notification.message}</p>
          <button
            onClick={() => removeNotification(notification.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}