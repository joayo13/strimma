<script lang="ts">
	import { deleteStreak } from '$lib/deleteStreak';
	import PrimaryButton from '../buttons/PrimaryButton.svelte';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';

	let confirmDialog: HTMLDialogElement;
	let { supabase, streak } = $props();

	function open() {
		confirmDialog.showModal();
	}

	function close() {
		confirmDialog.close();
	}
</script>

<button
	aria-label="Delete streak"
	onclick={open}
	class="rounded-lg px-4 py-2 transition-colors hover:bg-primary"
>
	🗑️
</button>

<dialog
	bind:this={confirmDialog}
	role="alertdialog"
	aria-labelledby="confirm-title"
	aria-describedby="confirm-desc"
	class="overflow-hidden rounded-lg text-tPrimary backdrop:bg-black/50"
>
	<div class="bg-bgPrimary p-6">
		<h2 id="confirm-title" class="mb-4 text-xl font-bold">Confirm Deletion</h2>
		<p id="confirm-desc">Are you sure you want to delete this streak?</p>
		<div class="mt-4 flex justify-between">
			<SecondaryButton
				title="Delete Streak"
				onclick={() => {
					deleteStreak(supabase, streak);
					close();
				}}
			/>
			<PrimaryButton title="Cancel" onclick={close} />
		</div>
	</div>
</dialog>
