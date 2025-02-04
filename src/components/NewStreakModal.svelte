   <script lang="ts">
  
    let settingsDialog: HTMLDialogElement;
  
    function open() {
      settingsDialog.showModal();
    }
  
    function close() {
      settingsDialog.close();
    }
  </script>
  
  <button onclick={open} class="hover:bg-secondary transition-colors px-4 py-2 rounded-lg">+ Add New Streak</button>
  
  <dialog bind:this={settingsDialog} class="backdrop:bg-black/50 rounded-lg overflow-hidden text-tBase">
    <div class={`bg-primary p-6`}>
      <h2 class="text-xl font-bold mb-4">Add New Streak</h2>
      <p>options...</p>
      <button onclick={close} class="mt-4 px-4 py-2 bg-secondary rounded-md">
        Close
      </button>
    </div>
  </dialog>