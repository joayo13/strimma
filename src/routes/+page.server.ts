import type { PageServerLoad } from './$types';
import { validateStreaks } from '$lib/validateStreaks';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
  depends('supabase:db:streaks');

  const { data: streaks, error } = await supabase
    .from('streaks')
    .select('id, streak_name, streak_days, last_updated')
    .order('id');
  if (error) {
  console.error('Error fetching streaks:', error);  // Log any error
}

  if (streaks) {
    const updatedStreaks = validateStreaks(streaks);

    await Promise.all(
      updatedStreaks.map(async (streak) => {
        if (streak.streak_days === 0) {
          await supabase
            .from('streaks')
            .update({ streak_days: 0, last_updated: streak.last_updated })
            .eq('id', streak.id);
        }
      })
    );

    return { streaks: updatedStreaks };
  }

  return { streaks: [] };
};