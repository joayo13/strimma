
<script lang="ts">
	import IncrementStreakButton from '../components/buttons/IncrementStreakButton.svelte';
	import DeleteStreakDialog from '../components/dialogs/DeleteStreakDialog.svelte';
	import EditStreakDialog from '../components/dialogs/EditStreakDialog.svelte';
	import NewStreakDialog from '../components/dialogs/NewStreakDialog.svelte';
	let { data } = $props()
	let { streaks, supabase, user } = $derived(data)
	
  </script>
  <ul class="flex flex-col items-center gap-2 w-screen md:w-[40rem]">
    {#each streaks as streak}
      <li class="flex items-center justify-between w-full">
        <p class="max-w-[20rem]">{streak.streak_name}</p>
        <div class="flex items-center">
        <p class="px-4 py-2">{streak.streak_days}</p>
        <IncrementStreakButton supabase={supabase} streak={streak}/>
        <EditStreakDialog supabase={supabase} streak={streak} />
        <DeleteStreakDialog supabase={supabase} streak={streak}/>
      </div>
      </li>

    {/each}
    <NewStreakDialog supabase={supabase} streaks={streaks}/>
  </ul>
  