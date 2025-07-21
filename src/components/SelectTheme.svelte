<script lang="ts">
	import { theme } from '$lib/theme';

	const themes = ['dark', 'light', 'amethyst', 'eva', 'gamma', 'janvier', 'ruby', 'sudo', 'zen']; // Add more if needed

	function changeTheme(event: Event) {
		const newTheme = (event.target as HTMLSelectElement).value;
		theme.set(newTheme);
	}
</script>

<select
	onchange={changeTheme}
	bind:value={$theme}
	class="rounded border bg-primary p-2 text-tPrimary"
>
	{#each themes as t}
		<option value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
	{/each}
</select>
