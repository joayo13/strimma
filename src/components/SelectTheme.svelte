<script lang="ts">
    import { theme } from "$lib/theme";
  
    const themes = ["dark", "light", "amethyst", "eva", "gamma", "janvier", "ruby",  "voltage",  "zen",]; // Add more if needed
  
    function changeTheme(event: Event) {
      const newTheme = (event.target as HTMLSelectElement).value;
      theme.set(newTheme);
    }
  </script>
  
  <select onchange={changeTheme} bind:value={$theme} class="p-2 border rounded text-tPrimary bg-primary">
    {#each themes as t}
      <option  value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
    {/each}
  </select>