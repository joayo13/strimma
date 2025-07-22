import type { PageServerLoad } from './$types';
import { validateStreaks } from '$lib/validateStreaks';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:streaks');

	const { data: streaks, error } = await supabase
		.from('streaks')
		.select('id, streak_name, streak_days, last_updated')
		.order('id');

	if (error) {
		console.error('Error fetching streaks:', error);
	}

	if (streaks) {
		const updatedStreaks = validateStreaks(streaks);

		await Promise.all(
			updatedStreaks.map(async (updatedStreak, i) => {
				const originalStreak = streaks[i];

				// Only update if streak_days or last_updated changed
				if (
					updatedStreak.streak_days !== originalStreak.streak_days ||
					updatedStreak.last_updated !== originalStreak.last_updated
				) {
					await supabase
						.from('streaks')
						.update({
							streak_days: updatedStreak.streak_days,
							last_updated: updatedStreak.last_updated
						})
						.eq('id', updatedStreak.id);
				}
			})
		);

		return { streaks: updatedStreaks };
	}

	return { streaks: [] };
};
