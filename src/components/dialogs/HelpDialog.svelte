<script lang="ts">
	import PrimaryButton from '../buttons/PrimaryButton.svelte';

	let helpDialog: HTMLDialogElement;

	export function open() {
		helpDialog.showModal();
	}

	function close() {
		helpDialog.close();
	}
</script>

<button
	aria-label="help"
	on:click={open}
	class="rounded-lg px-4 py-2 transition-colors hover:bg-primary"
>
	Help ❓
</button>

<dialog
	bind:this={helpDialog}
	class="overflow-hidden rounded-lg text-tPrimary backdrop:bg-black/50"
>
	<div class="max-w-md bg-bgPrimary p-6">
		<h2 class="mb-4 text-xl font-bold">How Streaks Work</h2>
		<p class="mb-4">
			To build long-term habits without losing motivation, your streak resets to the nearest lower
			multiple of 10 if you miss a day.
			<br /><br />
			For example, if your streak was at 17 and you miss a day, it’ll reset to 10 instead of 0. This
			creates “checkpoints” every 10 days, so one bad day doesn’t erase all your progress.
			<br /><br />
			Keep showing up, every 10 days is a win!
		</p>
		<PrimaryButton title="Got it!" onclick={close} />
	</div>
</dialog>
