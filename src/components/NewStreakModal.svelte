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
      <h2 class="text-xl mb-4">Add New Streak</h2>
      <form onsubmit={handleSubmit}>
        <label class="block py-2" for="streak_name"> 
          Streak Title
        </label>
          <input name="streak_name" type="text" placeholder="Create a streak" class="bg-secondary indent-2 text-xl px-2 py-2 rounded-lg"/>
          <div class="flex justify-between mt-4">
            <button type="submit" class="mt-4 px-4 py-2 hover:bg-secondary bg-bgPrimary text-primary hover:text-tBase rounded-md w-fit">
              Add Streak
            </button>
            <button onclick={close} class="mt-4 px-4 py-2 bg-secondary hover:bg-bgPrimary text-tBase hover:text-primary rounded-md">
              Cancel
            </button>
          </div>
      </form>
      
    </div>
  </dialog>