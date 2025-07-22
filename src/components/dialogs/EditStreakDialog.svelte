<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { EventHandler } from 'svelte/elements';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import PrimaryButton from '../buttons/PrimaryButton.svelte';
	import { addNotification } from '$lib/stores/notifications';
	let { supabase, streak } = $props();

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
		const streak_name = (new FormData(form).get('streak_name') ?? '') as string;
		if (!streak_name) return;

		let error;
		if (streak?.id) {
			// Updating existing streak
			({ error } = await supabase.from('streaks').update({ streak_name }).eq('id', streak.id));
		} else {
			// Creating new streak (fallback)
			({ error } = await supabase.from('streaks').insert({ streak_name, streak_days: 0 }));
		}

		if (error) {
			console.error(error);
		}

		invalidate('supabase:db:streaks');
		addNotification(`${streak.streak_name} updated to ${streak_name}`);
		form.reset();
		close();
	};
</script>

<button onclick={open} class="rounded-lg px-4 py-2 transition-colors hover:bg-primary"> ✏️ </button>

<dialog
	bind:this={settingsDialog}
	class="overflow-hidden rounded-lg text-tPrimary backdrop:bg-black/50"
>
	<div class={`bg-bgPrimary p-6`}>
		<h2 class="mb-4 text-xl font-bold">{streak ? 'Edit Streak' : 'Create Streak'}</h2>
		<form onsubmit={handleSubmit}>
			<label class="block py-2" for="streak_name">Streak Title</label>
			<input
				required
				name="streak_name"
				type="text"
				class="rounded-lg bg-primary px-2 py-2 indent-2 text-xl text-tPrimary"
				value={streak?.streak_name ?? ''}
			/>
			<div class="mt-4 flex justify-between">
				<SecondaryButton title={streak ? 'Save Changes' : 'Add Streak'} type="submit" />
				<PrimaryButton title="Cancel" onclick={close} />
			</div>
		</form>
	</div>
</dialog>
