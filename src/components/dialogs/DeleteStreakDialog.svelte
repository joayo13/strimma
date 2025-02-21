<script lang="ts">
	import { deleteStreak } from "$lib/deleteStreak";
	import PrimaryButton from "../buttons/PrimaryButton.svelte";
	import SecondaryButton from "../buttons/SecondaryButton.svelte";

    let confirmDialog: HTMLDialogElement;
    let { supabase, streak } = $props();
  
    function open() {
      confirmDialog.showModal();
    }
  
    function close() {
      confirmDialog.close();
    }

  </script>
  
  <button aria-label="Delete streak" onclick={open} class="hover:bg-primary transition-colors px-4 py-2 rounded-lg">
    🗑️
  </button>
  
  <dialog bind:this={confirmDialog} role="alertdialog" aria-labelledby="confirm-title" aria-describedby="confirm-desc" class="backdrop:bg-black/50 rounded-lg overflow-hidden text-tPrimary">
    <div class="bg-bgPrimary p-6">
      <h2 id="confirm-title" class="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p id="confirm-desc">Are you sure you want to delete this streak?</p>
      <div class="mt-4 flex justify-between">
        <SecondaryButton title="Delete Streak" onclick={() => deleteStreak(supabase, streak)}/>
        <PrimaryButton title="Cancel" onclick={close}/>
      </div>
    </div>
  </dialog>