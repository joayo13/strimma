
<script lang="ts">
	import NewStreakModal from '../components/NewStreakModal.svelte';
	let { data } = $props()
	let { streaks, supabase, user } = $derived(data)
	
	
  </script>
  <ul class="flex flex-col items-center gap-2">
    {#each streaks as streak}
      <li>{streak.streak_name + streak.streak_days} <button class="bg-green-500">streak</button></li>

    {/each}
    <NewStreakModal supabase={supabase} streaks={streaks}/>
  </ul>
  