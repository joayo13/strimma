<script lang="ts">
    let { title = "Button", ...props } = $props();
  </script>
  
  <button {...props} class="mt-4 px-4 py-2 bg-secondary hover:bg-bgPrimary hover:text-primary text-tBase rounded-md">
    {title}
  </button>
