import { invalidateAll } from "$app/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";

type Streak = {
  id: number;
  streak_name: string;
  streak_days: number;
  last_updated: string;
};

export async function incrementStreak(supabase: SupabaseClient, streak: Streak, setConfetti: (value: boolean) => void): Promise<Streak | null> {
  const now = new Date();
  const lastUpdated = new Date(streak.last_updated);

  // Compare current date and last updated date in terms of calendar day (UTC)
  const isNextDay = now.getUTCDate() > lastUpdated.getUTCDate();

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
    invalidateAll();
    return updatedStreak;
  }

  // No update needed if it's not the next day
  return null;
}