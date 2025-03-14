import { addNotification } from './stores/notifications';

export function validateStreaks(
  streaks: { id: number; streak_name: string; streak_days: number; last_updated: string }[]
) {
  const now = new Date();
  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Strip time using local timezone

  return streaks.map((streak) => {
    const lastUpdated = new Date(streak.last_updated);
    const lastUpdatedDate = new Date(
      lastUpdated.getFullYear(), lastUpdated.getMonth(), lastUpdated.getDate()
    ); // Strip time using local timezone

    const daysSinceLastUpdate =
      (todayDate.getTime() - lastUpdatedDate.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSinceLastUpdate > 1) {
      // If more than one full day has passed, reset streak
      addNotification(`${streak.streak_name} was reset to 0.`);
      return { ...streak, streak_days: 0, last_updated: now.toISOString() };
    }

    return streak;
  });
}
