<script lang="ts">
	import '../app.css';
	import SettingsModal from '../components/SettingsModal.svelte';
	import { invalidate } from '$app/navigation'
  	import { onMount } from 'svelte'
	let theme = $state('dark')
  	let { data, children } = $props()
  	let { session, supabase } = $derived(data)

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>
<nav class={`px-8 py-2 fixed flex w-full justify-between items-center bg-primary text-tBase theme-${theme}`}>
	<a href="/" class="text-3xl font-bold md:text-6xl">streakr</a>
	<SettingsModal supabase={supabase}/>
</nav>
<div class={`bg-primary text-tBase theme-${theme} min-h-screen flex items-center justify-center`}>
{@render children()}
</div>

