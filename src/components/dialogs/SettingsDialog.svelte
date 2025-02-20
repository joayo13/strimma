<script lang="ts">
	import SelectTheme from "../SelectTheme.svelte";

  
    let settingsDialog: HTMLDialogElement;
    let { supabase } = $props()
    function open() {
      settingsDialog.showModal();
    }
  
    function close() {
      settingsDialog.close();
    }
    const logout = async () => {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error(error)
		return
      }
	  window.location.reload()
    }
  </script>
  
  <button aria-label="settings" onclick={open} class="w-12 h-12 md:w-20 md:h-20  rounded-full bg-neutral-500">
  </button >
  
  <dialog bind:this={settingsDialog} class="backdrop:bg-black/50 rounded-lg overflow-hidden text-tBase">
    
    <div class={`bg-primary p-6`}>
      <h2 class="text-xl font-bold mb-4">Settings</h2>
      <SelectTheme/>
      <button onclick={logout} class="mt-4 px-4 py-2 bg-secondary rounded-md">Logout</button>
      <button onclick={close} class="mt-4 px-4 py-2 bg-secondary rounded-md">
        Close
      </button>
    </div>
  </dialog>