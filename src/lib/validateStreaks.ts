import { addNotification } from './stores/notifications';

export function validateStreaks(
	streaks: { id: number; streak_name: string; streak_days: number; last_updated: string }[]
) {
	const now = new Date();
	const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Strip time using local timezone

	return streaks.map((streak) => {
		const lastUpdated = new Date(streak.last_updated);
		const lastUpdatedDate = new Date(
			lastUpdated.getFullYear(),
			lastUpdated.getMonth(),
			lastUpdated.getDate()
		);

		const daysSinceLastUpdate =
			(todayDate.getTime() - lastUpdatedDate.getTime()) / (1000 * 60 * 60 * 24);

		if (daysSinceLastUpdate > 1) {
			// Reset to the nearest lower multiple of 10
			const newStreak = Math.floor(streak.streak_days / 10) * 10;
			addNotification(`${streak.streak_name} was reset to ${newStreak}.`);
			return { ...streak, streak_days: newStreak, last_updated: now.toISOString() };
		}

		return streak;
	});
}
