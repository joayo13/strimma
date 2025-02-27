<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import SettingsDialog from '../components/dialogs/SettingsDialog.svelte';
	import GlobalNotifications from '$lib/components/GlobalNotifications.svelte';
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

<nav class={`fixed flex w-full items-center justify-between bg-bgPrimary px-4 py-2 text-tPrimary`}>
	<a href="/" class="text-3xl font-bold text-primary md:text-6xl">strimma</a>
	<SettingsDialog {user} {supabase} />
</nav>
<GlobalNotifications />
<div class={`flex min-h-screen items-center justify-center bg-bgPrimary px-4 text-tPrimary`}>
	{@render children()}
</div>
