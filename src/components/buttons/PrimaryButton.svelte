<script lang="ts">
	let { title = 'Button', ...props } = $props();
</script>

<button {...props} class="mt-4 rounded-md bg-primary px-4 py-2 transition-all hover:brightness-110">
	{title}
</button>
