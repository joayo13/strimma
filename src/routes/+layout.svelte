<script lang="ts">
	import '../app.css';
	import SettingsModal from '../components/SettingsModal.svelte';
	let { children } = $props();
	let theme = $state('dark')
	let settingsOpen = $state(false)
</script>
<nav class="px-8 py-2 fixed flex w-full justify-between items-center bg-primary text-tBase theme-${theme}">
	<a href="/" class="text-3xl font-bold md:text-6xl">streakr</a>
	<SettingsModal theme={theme}/>
</nav>
<div class={`bg-primary text-tBase theme-${theme} min-h-screen flex items-center justify-center`}>
{@render children()}
</div>

