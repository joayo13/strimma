
<script lang="ts">
	import { deleteStreak } from '$lib/deleteStreak';
	import { incrementStreak } from '$lib/incrementStreak';
	import NewStreakModal from '../components/NewStreakModal.svelte';
	let { data } = $props()
	let { streaks, supabase, user } = $derived(data)
	
  </script>
  <ul class="flex flex-col items-center gap-2">
    {#each streaks as streak}
      <li>{streak.streak_name + streak.streak_days} 
        <button onclick={() => incrementStreak(supabase, streak)} class="bg-green-500">streak</button>
        <button onclick={() => deleteStreak(supabase, streak)}>delete</button>
      </li>

    {/each}
    <NewStreakModal supabase={supabase} streaks={streaks}/>
  </ul>
  