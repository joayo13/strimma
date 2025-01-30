<script lang="ts">
	import '../app.css';
	let { children } = $props();
	
</script>
<div class={`bg-primary text-tBase theme-orange`}>
{@render children()}
</div>
