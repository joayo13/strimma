<script lang="ts">
	import { incrementStreak } from '$lib/incrementStreak';
	import Confetti from 'svelte-confetti';

	let { supabase, streak } = $props();
	let confetti = $state(false);
</script>

<div>
	{#if confetti}
		<Confetti rounded={true} amount={100} fallDistance={'10rem'} x={[-2, 2]} />
	{/if}
</div>
<button
	onclick={() => {
		incrementStreak(supabase, streak, (value: boolean) => (confetti = value));
	}}
	class="rounded-lg px-4 py-2 transition-colors hover:bg-primary">✅</button
>
