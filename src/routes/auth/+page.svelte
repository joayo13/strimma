<script>
	import PrimaryButton from '../../components/buttons/PrimaryButton.svelte';
	import SecondaryButton from '../../components/buttons/SecondaryButton.svelte';
</script>

<form class="flex flex-col gap-2" method="POST" action="?/login">
	<label for="email" class="block"> Email </label>
	<input
		required
		name="email"
		type="email"
		class="rounded-lg bg-primary px-2 py-2 indent-2 text-xl text-tPrimary"
	/>

	<label for="password"> Password </label>
	<input
		required
		name="password"
		type="password"
		class="rounded-lg bg-primary px-2 py-2 indent-2 text-xl text-tPrimary"
	/>
	<div class="flex justify-between">
		<PrimaryButton title="Login"></PrimaryButton>
		<SecondaryButton title="Sign Up" formaction="?/signup"></SecondaryButton>
	</div>
	<PrimaryButton title="Google" formaction="?/googleSignIn"></PrimaryButton>
</form>
