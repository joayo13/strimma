import { describe, it, expect } from 'vitest';
import { validateStreaks } from '$lib/validateStreaks';
import { incrementStreak } from '$lib/incrementStreak';

function getISODate(daysAgo: number) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo); // Move back by `daysAgo`
  return date.toISOString();
}

describe('validateStreaks', () => {
  it('should reset the streak if last_updated is more than a day ago', () => {
    const streaks = [
      { id: 1, streak_name: 'Test Streak', streak_days: 5, last_updated: getISODate(2) }, // 2 days ago
    ];

    const updatedStreaks = validateStreaks(streaks);
    expect(updatedStreaks[0].streak_days).toBe(0);
  });

  it('should not reset the streak if last_updated is today', () => {
    const streaks = [
      { id: 1, streak_name: 'Test Streak', streak_days: 5, last_updated: getISODate(0) }, // Today
    ];

    const updatedStreaks = validateStreaks(streaks);
    expect(updatedStreaks[0].streak_days).toBe(5);
  });

  it('should correctly reset multiple streaks when needed', () => {
    const streaks = [
      { id: 1, streak_name: 'Streak A', streak_days: 3, last_updated: getISODate(3) }, // 3 days ago
      { id: 2, streak_name: 'Streak B', streak_days: 1, last_updated: getISODate(1) }, // 1 day ago
      { id: 3, streak_name: 'Streak C', streak_days: 4, last_updated: getISODate(0) }, // Today
    ];

    const updatedStreaks = validateStreaks(streaks);
    expect(updatedStreaks[0].streak_days).toBe(0);
    expect(updatedStreaks[1].streak_days).toBe(1);
    expect(updatedStreaks[2].streak_days).toBe(4);
  });
});

describe('incrementStreak', () => {
  it('should increment the streak if a new day has passed', () => {
    const streak = {
      id: 1,
      streak_name: 'Daily workout',
      streak_days: 5,
      last_updated: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    };

    const updatedStreak = incrementStreak(streak);
    expect(updatedStreak.streak_days).toBe(6);
    expect(updatedStreak.last_updated).not.toBe(streak.last_updated);
  });

  it('should not increment the streak if the same day', () => {
    const streak = {
      id: 1,
      streak_name: 'Daily workout',
      streak_days: 5,
      last_updated: new Date().toISOString(), // Today
    };

    const updatedStreak = incrementStreak(streak);
    expect(updatedStreak.streak_days).toBe(5); // No increment
    expect(updatedStreak.last_updated).toBe(streak.last_updated); // Same date
  });

  it('should not increment the streak if the update was already today', () => {
    const streak = {
      id: 1,
      streak_name: 'Daily workout',
      streak_days: 5,
      last_updated: new Date().toISOString(), // Same day
    };

    const updatedStreak = incrementStreak(streak);
    expect(updatedStreak.streak_days).toBe(5); // No increment
  });
});
