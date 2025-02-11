   <script lang="ts">
	import { invalidate } from "$app/navigation";
	import type { EventHandler } from "svelte/elements";
  let {supabase, streaks} = $props()
  
    let settingsDialog: HTMLDialogElement;
  
    function open() {
      settingsDialog.showModal();
    }
  
    function close() {
      settingsDialog.close();
    }
    const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (evt) => {
      evt.preventDefault()
      if (!evt.target) return
  
      const form = evt.target as HTMLFormElement
  
      const streak = (new FormData(form).get('streak_name') ?? '') as string
      if (!streak) return
  
      const { error } = await supabase.from('streaks').insert({ streak_name: streak, streak_days: 0})
      if (error) console.error(error)
  
      invalidate('supabase:db:streaks')
      form.reset()
    }
  </script>
  
  <button onclick={open} class="hover:bg-secondary transition-colors px-4 py-2 rounded-lg">+ Add New Streak</button>
  
  <dialog bind:this={settingsDialog} class="backdrop:bg-black/50 rounded-lg overflow-hidden text-tBase">
    <div class={`bg-primary p-6`}>
      <h2 class="text-xl font-bold mb-4">Add New Streak</h2>
      <form onsubmit={handleSubmit}>
        <label>
          Add a streak
          <input name="streak_name" type="text" />
        </label>
      </form>
      <button onclick={close} class="mt-4 px-4 py-2 bg-secondary rounded-md">
        Close
      </button>
    </div>
  </dialog>