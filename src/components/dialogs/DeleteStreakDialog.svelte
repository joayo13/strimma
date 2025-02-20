<script lang="ts">
	import { deleteStreak } from "$lib/deleteStreak";

    let confirmDialog: HTMLDialogElement;
    let { supabase, streak } = $props();
  
    function open() {
      confirmDialog.showModal();
    }
  
    function close() {
      confirmDialog.close();
    }

  </script>
  
  <button aria-label="Delete streak" onclick={open}>
    🗑️
  </button>
  
  <dialog bind:this={confirmDialog} role="alertdialog" aria-labelledby="confirm-title" aria-describedby="confirm-desc" class="backdrop:bg-black/50 rounded-lg overflow-hidden text-tBase">
    <div class="bg-primary p-6">
      <h2 id="confirm-title" class="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p id="confirm-desc">Are you sure you want to delete this streak?</p>
      <div class="mt-4 flex justify-between">
        <button onclick={() => deleteStreak(supabase, streak)} class="px-4 py-2 bg-secondary text-tBase rounded-md">Delete Streak</button>
        <button onclick={close} class="px-4 py-2 bg-secondary rounded-md">Cancel</button>
      </div>
    </div>
  </dialog>