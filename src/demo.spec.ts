import { describe, it, expect } from 'vitest';
import { validateStreaks } from '$lib/validateStreaks';

function getISODate(daysAgo: number) {
	const date = new Date();
	date.setDate(date.getDate() - daysAgo);
	return date.toISOString();
}

describe('validateStreaks', () => {
	it('should reset to 0 if under 10 and last_updated is more than a day ago', () => {
		const streaks = [
			{ id: 1, streak_name: 'Test Streak', streak_days: 5, last_updated: getISODate(2) }
		];

		const updatedStreaks = validateStreaks(streaks);
		expect(updatedStreaks[0].streak_days).toBe(0);
	});

	it('should reset to 10 if streak is between 10–19 and last_updated is too old', () => {
		const streaks = [
			{ id: 2, streak_name: 'Decent Streak', streak_days: 17, last_updated: getISODate(3) }
		];

		const updatedStreaks = validateStreaks(streaks);
		expect(updatedStreaks[0].streak_days).toBe(10);
	});

	it('should reset to 20 if streak is between 20–29 and last_updated is too old', () => {
		const streaks = [
			{ id: 3, streak_name: 'Solid Streak', streak_days: 28, last_updated: getISODate(4) }
		];

		const updatedStreaks = validateStreaks(streaks);
		expect(updatedStreaks[0].streak_days).toBe(20);
	});

	it('should not reset the streak if last_updated is today', () => {
		const streaks = [
			{ id: 4, streak_name: 'Fresh Streak', streak_days: 5, last_updated: getISODate(0) }
		];

		const updatedStreaks = validateStreaks(streaks);
		expect(updatedStreaks[0].streak_days).toBe(5);
	});

	it('should handle a mix of streaks correctly', () => {
		const streaks = [
			{ id: 1, streak_name: 'Old Low', streak_days: 4, last_updated: getISODate(3) }, // → 0
			{ id: 2, streak_name: 'Old Med', streak_days: 14, last_updated: getISODate(3) }, // → 10
			{ id: 3, streak_name: 'Recent', streak_days: 22, last_updated: getISODate(0) }, // → 22
			{ id: 4, streak_name: 'Just Late', streak_days: 29, last_updated: getISODate(2) } // → 20
		];

		const updated = validateStreaks(streaks);
		expect(updated[0].streak_days).toBe(0);
		expect(updated[1].streak_days).toBe(10);
		expect(updated[2].streak_days).toBe(22);
		expect(updated[3].streak_days).toBe(20);
	});

	it('should maintain streak if updated just before midnight', () => {
		const now = new Date();
		const justBeforeMidnight = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() - 1,
			23,
			59,
			59
		);

		const streaks = [
			{
				id: 5,
				streak_name: 'Late Night Save',
				streak_days: 12,
				last_updated: justBeforeMidnight.toISOString()
			}
		];

		const updated = validateStreaks(streaks);
		expect(updated[0].streak_days).toBe(12); // Should still count as today
	});
});
