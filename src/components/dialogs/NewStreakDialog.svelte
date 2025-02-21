   <script lang="ts">
	import { invalidate } from "$app/navigation";
	import type { EventHandler } from "svelte/elements";
	import PrimaryButton from "../buttons/PrimaryButton.svelte";
	import SecondaryButton from "../buttons/SecondaryButton.svelte";
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
      close()
    }
  </script>
  
  <button onclick={open} class="hover:bg-primary transition-colors px-4 py-2 rounded-lg">+ Add New Streak</button>
  
  <dialog bind:this={settingsDialog} class="backdrop:bg-black/50 rounded-lg overflow-hidden text-tPrimary">
    <div class={`bg-bgPrimary p-6`}>
      <h2 class="text-xl mb-4">Add New Streak</h2>
      <form onsubmit={handleSubmit}>
        <label class="block py-2" for="streak_name"> 
          Streak Title
        </label>
          <input required name="streak_name" type="text" class="bg-primary text-tPrimary indent-2 text-xl px-2 py-2 rounded-lg"/>
          <div class="flex justify-between mt-4">
            <SecondaryButton title="Add Streak" type="submit"/>
            <PrimaryButton title="Cancel" onclick={close}/>
          </div>
      </form>
      
    </div>
  </dialog>