import { invalidateAll } from '$app/navigation';
import type { SupabaseClient } from '@supabase/supabase-js';
import { addNotification } from './stores/notifications';

type Streak = {
	id: number;
	streak_name: string;
	streak_days: number;
	last_updated: string;
};

const celebrations = [
	'Yippee!',
	'Wahoo!',
	'Congrats!',
	'Well done!',
	'Good job!',
	'Oh yeah!',
	'Keep it up!',
	'Great work!',
	'Awesome!',
	'Nice job!',
	'Fantastic!',
	'Amazing!',
	'Yay!',
	'Super!',
	'Wicked!',
	'Yeehaw!',
	'Letsa go!',
	'Hell yeah!',
	'Epic!',
	'You rock!',
	'Woohoo!',
	'Hot damn!',
	'YESSSSS.',
	'Sweeeet.',
	'Sick streak!'
];

export async function incrementStreak(
	supabase: SupabaseClient,
	streak: Streak,
	setConfetti: (value: boolean) => void
): Promise<Streak | null> {
	const now = new Date();
	const lastUpdated = new Date(streak.last_updated);

	// Compare current date and last updated date in terms of calendar day (local time)
	const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const lastUpdatedDate = new Date(
		lastUpdated.getFullYear(),
		lastUpdated.getMonth(),
		lastUpdated.getDate()
	);

	// Check if today's date is different from last update date
	const isNextDay = todayDate.getTime() > lastUpdatedDate.getTime();

	// If it is the next day or streak_days is 0, increment the streak and update last_updated
	if (isNextDay || streak.streak_days === 0) {
		const updatedStreak = {
			...streak,
			streak_days: streak.streak_days + 1,
			last_updated: now.toISOString()
		};

		// Update streak in Supabase
		const { error } = await supabase
			.from('streaks') // Replace with your actual table name
			.update({
				streak_days: updatedStreak.streak_days,
				last_updated: updatedStreak.last_updated
			})
			.eq('id', streak.id);

		if (error) {
			console.error('Error updating streak:', error);
			return null;
		}
		setConfetti(true);
		addNotification(
			`${celebrations[Math.floor(Math.random() * celebrations.length)]} ${streak.streak_name} was incremented`
		);
		invalidateAll();
		return updatedStreak;
	}

	addNotification(`${streak.streak_name} was already updated today`);
	return null;
}
