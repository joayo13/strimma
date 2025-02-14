import { describe, it, expect } from 'vitest';
import { validateStreaks } from '$lib/validateStreaks';

describe('validateStreaks', () => {
  it('should reset the streak if last_updated is more than a day ago', () => {
    const streaks = [
      { id: 1, streak_days: 5, last_updated: new Date(Date.now() - 2 * 86400000).toISOString() }, // 2 days ago
    ];

    const updatedStreaks = validateStreaks(streaks);
    expect(updatedStreaks[0].streak_days).toBe(0);
  });

  it('should not reset the streak if last_updated is today', () => {
    const streaks = [
      { id: 1, streak_days: 5, last_updated: new Date().toISOString() }, // Today
    ];

    const updatedStreaks = validateStreaks(streaks);
    expect(updatedStreaks[0].streak_days).toBe(5);
  });

  it('should correctly reset multiple streaks when needed', () => {
    const streaks = [
      { id: 1, streak_days: 3, last_updated: new Date(Date.now() - 3 * 86400000).toISOString() }, // 3 days ago
      { id: 2, streak_days: 1, last_updated: new Date(Date.now() - 1 * 86400000).toISOString() }, // 1 day ago
      { id: 3, streak_days: 4, last_updated: new Date().toISOString() }, // Today
    ];

    const updatedStreaks = validateStreaks(streaks);
    expect(updatedStreaks[0].streak_days).toBe(0);
    expect(updatedStreaks[1].streak_days).toBe(0);
    expect(updatedStreaks[2].streak_days).toBe(4);
  });
});