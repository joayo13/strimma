<script lang="ts">
	import { incrementStreak } from '$lib/incrementStreak';
	import Confetti from 'svelte-confetti';

	let { supabase, streak } = $props();
	let confetti = $state(false);

	const secondaryColor = getComputedStyle(document.documentElement)
		.getPropertyValue('--color-secondary')
		.trim();
	const primaryColor = getComputedStyle(document.documentElement)
		.getPropertyValue('--color-primary')
		.trim();
</script>

<div>
	{#if confetti}
		<Confetti
			colorArray={[primaryColor, secondaryColor]}
			amount={100}
			fallDistance={'5rem'}
			x={[-1, 1]}
			y={[0, 1]}
		/>
	{/if}
</div>
<button
	onclick={() => {
		incrementStreak(supabase, streak, (value: boolean) => (confetti = value));
	}}
	class="rounded-lg px-4 py-2 transition-colors hover:bg-primary">✅</button
>
