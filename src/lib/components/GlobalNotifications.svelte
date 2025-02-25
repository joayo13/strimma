<script lang="ts">
    import { notifications } from '$lib/stores/notifications';
	import { fade } from 'svelte/transition';
  </script>
  
  <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center overflow-hidden">
    {#each $notifications as { message }}
      <div
        class="bg-primary text-tPrimary p-3 rounded-lg shadow-lg w-fit"
        transition:fade
      >
        {message}
      </div>
    {/each}
  </div>