<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import SettingsDialog from '../components/dialogs/SettingsDialog.svelte';
	import GlobalNotifications from '$lib/components/GlobalNotifications.svelte';
	import HelpDialog from '../components/dialogs/HelpDialog.svelte';
	let { data, children } = $props();
	let { session, supabase, user } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<nav class={`fixed flex w-full items-start justify-between bg-bgPrimary px-4 py-2 text-tPrimary`}>
	<a href="/" class="text-3xl font-bold text-primary md:text-6xl">10streak</a>
	<div class="flex flex-col items-end">
		<SettingsDialog {user} {supabase} />
		<HelpDialog />
	</div>
</nav>
<GlobalNotifications />
<div
	class={`flex min-h-screen items-center justify-center overflow-x-hidden bg-bgPrimary px-4 text-tPrimary`}
>
	{@render children()}
</div>
