<script lang="ts">
    let { title = "Button", ...props } = $props();
  </script>
  
  <button {...props} class="mt-4 px-4 py-2 hover:bg-secondary bg-bgPrimary text-primary hover:text-tBase rounded-md">
    {title}
  </button>