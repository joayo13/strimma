import { invalidateAll } from "$app/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";

type Streak = {
  id: number;
  streak_name: string;
  streak_days: number;
  last_updated: string;
};

export async function deleteStreak(supabase: SupabaseClient, streak: Streak): Promise<boolean> {
  const { error } = await supabase
    .from("streaks") // Replace with actual table name
    .delete()
    .eq("id", streak.id);

  if (error) {
    console.error("Error deleting streak:", error);
    return false;
  }
  invalidateAll()
  return true;
}
