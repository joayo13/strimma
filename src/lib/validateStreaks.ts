export function validateStreaks(streaks: { id: number; streak_name: string; streak_days: number; last_updated: string }[]) {
    const now = new Date();
    return streaks.map((streak) => {
      const lastUpdated = new Date(streak.last_updated);
      const daysSinceLastUpdate = Math.floor(now.getTime() / (1000 * 60 * 60 * 24)) -
                                  Math.floor(lastUpdated.getTime() / (1000 * 60 * 60 * 24));
  
      if (daysSinceLastUpdate >= 1) {
        return { ...streak, streak_days: 0, last_updated: now.toISOString() };
      }
  
      return streak;
    });
  }