<script lang="ts">
	import { incrementStreak } from "$lib/incrementStreak";
	import Confetti from "svelte-confetti";

    let {supabase, streak} = $props()
    let confetti = $state(false)
</script>
<div>
{#if confetti}
<Confetti/>
{/if}
</div>
<button onclick={() => {incrementStreak(supabase, streak, (value: boolean) => confetti = value)}} class="hover:bg-secondary transition-colors px-4 py-2 rounded-lg">✅</button>