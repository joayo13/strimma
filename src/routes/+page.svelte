<script lang="ts">
	import IncrementStreakButton from '../components/buttons/IncrementStreakButton.svelte';
	import DeleteStreakDialog from '../components/dialogs/DeleteStreakDialog.svelte';
	import EditStreakDialog from '../components/dialogs/EditStreakDialog.svelte';
	import NewStreakDialog from '../components/dialogs/NewStreakDialog.svelte';
	let { data } = $props();
	let { streaks, supabase, user } = $derived(data);
</script>

<ul class="flex w-screen flex-col items-center gap-2 md:w-[40rem]">
	{#each streaks as streak}
		<li class="flex w-full items-center justify-between">
			<p class="overflow-hidden overflow-ellipsis whitespace-nowrap px-4 md:max-w-[20rem]">
				{streak.streak_name}
			</p>
			<div class="flex items-center">
				<p class="px-4 py-2">{streak.streak_days}</p>
				<IncrementStreakButton {supabase} {streak} />
				<EditStreakDialog {supabase} {streak} />
				<DeleteStreakDialog {supabase} {streak} />
			</div>
		</li>
	{/each}
	<NewStreakDialog {supabase} {streaks} />
</ul>
