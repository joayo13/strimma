
<script lang="ts">
	import { incrementStreak } from '$lib/incrementStreak';
	import DeleteStreakDialog from '../components/dialogs/DeleteStreakDialog.svelte';
	import NewStreakDialog from '../components/dialogs/NewStreakDialog.svelte';
	let { data } = $props()
	let { streaks, supabase, user } = $derived(data)
	
  </script>
  <ul class="flex flex-col items-center gap-2">
    {#each streaks as streak}
      <li>{streak.streak_name + streak.streak_days} 
        <button onclick={() => incrementStreak(supabase, streak)} class="bg-green-500">streak</button>
        <DeleteStreakDialog supabase={supabase} streak={streak}/>
      </li>

    {/each}
    <NewStreakDialog supabase={supabase} streaks={streaks}/>
  </ul>
  