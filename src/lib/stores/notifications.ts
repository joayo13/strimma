import { writable } from 'svelte/store';

type Notification = {
	id: number;
	message: string;
};

const notifications = writable<Notification[]>([]);

const addNotification = (message: string, duration = 3000) => {
	const id = Date.now();

	notifications.update((n) => [...n, { id, message }]);

	// Delay removal to allow the transition to complete
	setTimeout(() => {
		notifications.update((n) => n.filter((notif) => notif.id !== id));
	}, duration);
};

export { notifications, addNotification };