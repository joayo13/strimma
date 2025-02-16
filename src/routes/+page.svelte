
<script lang="ts">
	import { incrementStreak } from '$lib/incrementStreak';
	import NewStreakModal from '../components/NewStreakModal.svelte';
	let { data } = $props()
	let { streaks, supabase, user } = $derived(data)
	export async function applyIncrement(streak: { id: number; streak_name: string; streak_days: number; last_updated: string }) {
  const updatedStreak = incrementStreak(streak);
  
  if (updatedStreak === streak) return; // No update needed

  const { error } = await supabase
    .from('streaks') // Replace with your actual table name
    .update({ 
      streak_days: updatedStreak.streak_days, 
      last_updated: updatedStreak.last_updated 
    })
    .eq('id', streak.id);

  if (error) {
    console.error('Error updating streak:', error);
    return false;
  }

  return true;
}
	
  </script>
  <ul class="flex flex-col items-center gap-2">
    {#each streaks as streak}
      <li>{streak.streak_name + streak.streak_days} <button onclick={() => applyIncrement(streak)} class="bg-green-500">streak</button></li>

    {/each}
    <NewStreakModal supabase={supabase} streaks={streaks}/>
  </ul>
  