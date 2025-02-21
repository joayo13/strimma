<script lang="ts">
    let { title = "Button", ...props } = $props();
  </script>
  
  <button {...props} class="transition-all mt-4 px-4 py-2 bg-secondary text-tSecondary hover:brightness-110 rounded-md">
    {title}
  </button>
