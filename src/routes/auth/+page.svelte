<script>
	import PrimaryButton from "../../components/buttons/PrimaryButton.svelte";
	import SecondaryButton from "../../components/buttons/SecondaryButton.svelte";

</script>
<form class="flex flex-col gap-2" method="POST" action="?/login">
    <label for="email" class="block">
      Email
    </label>
      <input required name="email" type="email" class="bg-primary text-tPrimary indent-2 text-xl px-2 py-2 rounded-lg"/>
    
    <label for="password">
      Password
    </label>
      <input required name="password" type="password" class="bg-primary text-tPrimary indent-2 text-xl px-2 py-2 rounded-lg"/>
    <div class="flex justify-between">
    <PrimaryButton title="Login"></PrimaryButton>
    <SecondaryButton title="Sign Up" formaction="?/signup"></SecondaryButton>
  </div>
  </form>