
<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { EventHandler } from 'svelte/elements';
	import NewStreakModal from '../components/NewStreakModal.svelte';
	let { data } = $props()
	let { streaks, supabase, user } = $derived(data)
	const logout = async () => {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error(error)
		return
      }
	  window.location.reload()
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
  
  <h1>Private page for user: {user?.email}</h1>
  <h2>Notes</h2>
  <ul>
    {#each streaks as streak}
      <li>{streak.streak_name + streak.streak_days}</li>

    {/each}
  </ul>
  <form onsubmit={handleSubmit}>
    <label>
      Add a streak
      <input name="streak_name" type="text" />
    </label>
  </form>
  <button onclick={logout}>Logout</button>
    
  
    
  
  <NewStreakModal/>