<script lang="ts">
	import '../app.css';
	let { children } = $props();
	
</script>
<nav class="px-8 py-2 flex justify-between items-center">
	<a href="/" class="text-3xl md:text-6xl">streakr</a>
	<div class="w-12 h-12 md:w-20 md:h-20  rounded-full bg-neutral-500"></div>
</nav>
<div class={`bg-primary text-tBase theme-orange`}>
{@render children()}
</div>
