<script lang="ts">
    let { title = "Button", ...props } = $props();
  </script>
  
  <button {...props} class="mt-4 px-4 py-2 hover:brightness-110 transition-all bg-primary rounded-md">
    {title}
  </button>