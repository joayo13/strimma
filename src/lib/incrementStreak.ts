export function incrementStreak(streak: { id: number; streak_name: string; streak_days: number; last_updated: string }) {
    const now = new Date();
    const lastUpdated = new Date(streak.last_updated);
  
    // Compare current date and last updated date in terms of calendar day (UTC)
    const isNextDay = now.getUTCDate() > lastUpdated.getUTCDate()
    // If it is the next day, increment the streak and update last_updated
    return isNextDay
      ? { ...streak, streak_days: streak.streak_days + 1, last_updated: now.toISOString() }
      : streak;
  }