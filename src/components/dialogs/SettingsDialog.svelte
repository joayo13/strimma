<script lang="ts">
	import PrimaryButton from "../buttons/PrimaryButton.svelte";
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
  
  <button aria-label="settings" onclick={open} class="hover:bg-primary transition-colors px-4 py-2 rounded-lg">
    Settings ⚙️
  </button >
  
  <dialog bind:this={settingsDialog} class="backdrop:bg-black/50 rounded-lg overflow-hidden text-tPrimary">
    
    <div class={`bg-bgPrimary p-6`}>
      <h2 class="text-xl font-bold mb-4">Settings</h2>
      <SelectTheme/>
      <PrimaryButton title="Logout" onclick={logout} />
      <PrimaryButton title="Close"  onclick={close} />
    </div>
  </dialog>