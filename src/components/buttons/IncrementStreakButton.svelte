<script lang="ts">
	import { onMount } from 'svelte';
	import { incrementStreak } from '$lib/incrementStreak';
	import Confetti from 'svelte-confetti';

	let { supabase, streak } = $props();
	let confetti = $state(false);

	let primaryColor = $state('#0f0'); // fallback
	let secondaryColor = $state('#888'); // fallback

	onMount(() => {
		const getCSSVar = (name: string, fallback: string): string => {
			const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
			return value || fallback;
		};

		primaryColor = getCSSVar('--color-primary', primaryColor);
		secondaryColor = getCSSVar('--color-secondary', secondaryColor);
	});
</script>

<div>
	{#if confetti}
		<Confetti
			amount={100}
			colorArray={[primaryColor, secondaryColor]}
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
