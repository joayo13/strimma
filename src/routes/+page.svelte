
<script lang="ts">
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
	
  </script>
  <ul>
    {#each streaks as streak}
      <li>{streak.streak_name + streak.streak_days}</li>

    {/each}
  </ul>
  
  <button onclick={logout}>Logout</button>
    
  
    
  
  <NewStreakModal supabase={supabase} streaks={streaks}/>