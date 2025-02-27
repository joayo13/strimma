<script lang="ts">
	import PrimaryButton from '../buttons/PrimaryButton.svelte';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import SelectTheme from '../SelectTheme.svelte';

	let settingsDialog: HTMLDialogElement;
	let { supabase, user } = $props();
	function open() {
		settingsDialog.showModal();
	}

	function close() {
		settingsDialog.close();
	}
	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
			return;
		}
		window.location.reload();
	};
</script>

<button
	aria-label="settings"
	onclick={open}
	class="rounded-lg px-4 py-2 transition-colors hover:bg-primary"
>
	Settings ⚙️
</button>

<dialog
	bind:this={settingsDialog}
	class="overflow-hidden rounded-lg text-tPrimary backdrop:bg-black/50"
>
	<div class={`bg-bgPrimary p-6`}>
		<h2 class="mb-4 text-xl font-bold">Settings</h2>
		<SelectTheme />
		{#if user}
			<SecondaryButton title="Logout" onclick={logout} />
		{/if}
		<PrimaryButton title="Close" onclick={close} />
	</div>
</dialog>
