<script lang="ts">
	import { invalidate } from "$app/navigation";
	import type { EventHandler } from "svelte/elements";
	import LightButton from "../buttons/LightButton.svelte";
	import DarkButton from "../buttons/DarkButton.svelte";

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
		const streak_name = (new FormData(form).get("streak_name") ?? "") as string;
		if (!streak_name) return;

		let error;
		if (streak?.id) {
			// Updating existing streak
			({ error } = await supabase.from("streaks").update({ streak_name }).eq("id", streak.id));
		} else {
			// Creating new streak (fallback)
			({ error } = await supabase.from("streaks").insert({ streak_name, streak_days: 0 }));
		}

		if (error) console.error(error);

		invalidate("supabase:db:streaks");
		form.reset();
		close();
	};
</script>

<button onclick={open} class="hover:bg-secondary transition-colors px-4 py-2 rounded-lg">
	✏️
</button>

<dialog bind:this={settingsDialog} class="backdrop:bg-black/50 rounded-lg overflow-hidden text-tBase">
	<div class={`bg-primary p-6`}>
		<h2 class="text-xl mb-4">{streak ? "Edit Streak" : "Create Streak"}</h2>
		<form onsubmit={handleSubmit}>
			<label class="block py-2" for="streak_name">Streak Title</label>
			<input
				required
				name="streak_name"
				type="text"
				placeholder="Enter streak name"
				class="bg-secondary text-tBase indent-2 text-xl px-2 py-2 rounded-lg"
				value={streak?.streak_name ?? ""}
			/>
			<div class="flex justify-between mt-4">
				<LightButton title={streak ? "Save Changes" : "Add Streak"} type="submit" />
				<DarkButton title="Cancel" onclick={close} />
			</div>
		</form>
	</div>
</dialog>