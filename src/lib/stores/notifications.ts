import { writable } from 'svelte/store';

type Notification = {
  id: number;
  message: string;
};

const notifications = writable<Notification[]>([]);

const addNotification = (message: string, duration = 3000) => {
    const id = Date.now();
  
    notifications.update((n) => [...n, { id, message }]);
  
    // Ensure only one notification is visible at a time
    setTimeout(() => {
      notifications.update((n) => n.slice(1)); // Remove the first notification in the queue
    }, duration);
  };

export { notifications, addNotification };