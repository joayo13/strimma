<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { EventHandler } from 'svelte/elements';
	import PrimaryButton from '../buttons/PrimaryButton.svelte';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import { addNotification } from '$lib/stores/notifications';
	let { supabase, streaks } = $props();

	let settingsDialog: HTMLDialogElement;

	function open() {
		settingsDialog.showModal();
	}

	function close() {
		settingsDialog.close();
	}
	const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (evt) => {
		evt.preventDefault();
		if (!evt.target) return;

		const form = evt.target as HTMLFormElement;

		const streak = (new FormData(form).get('streak_name') ?? '') as string;
		if (!streak) return;

		const { error } = await supabase
			.from('streaks')
			.insert({ streak_name: streak, streak_days: 0 });
		if (error) console.error(error);

		addNotification(`${streak} was added to streaks`);
		invalidate('supabase:db:streaks');
		form.reset();
		close();
	};
</script>

<button onclick={open} class="rounded-lg px-4 py-2 transition-colors hover:bg-primary"
	>+ Add New Streak</button
>

<dialog
	bind:this={settingsDialog}
	class="overflow-hidden rounded-lg text-tPrimary backdrop:bg-black/50"
>
	<div class={`bg-bgPrimary p-6`}>
		<h2 class="mb-4 text-xl">Add New Streak</h2>
		<form onsubmit={handleSubmit}>
			<label class="block py-2" for="streak_name"> Streak Title </label>
			<input
				required
				name="streak_name"
				type="text"
				class="rounded-lg bg-primary px-2 py-2 indent-2 text-xl text-tPrimary"
			/>
			<div class="mt-4 flex justify-between">
				<SecondaryButton title="Add Streak" type="submit" />
				<PrimaryButton title="Cancel" onclick={close} />
			</div>
		</form>
	</div>
</dialog>
