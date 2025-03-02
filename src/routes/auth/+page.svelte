<script>
	import PrimaryButton from '../../components/buttons/PrimaryButton.svelte';
	import SecondaryButton from '../../components/buttons/SecondaryButton.svelte';
	import SignInWithGoogleButton from '../../components/buttons/SignInWithGoogleButton.svelte';
</script>
<div>
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
	
</form>
<div class='flex gap-2 items-center mt-4'>
	<div class='h-px w-full bg-tPrimary'></div>
	<p class='text-sm'>or</p>
	<div class='h-px w-full bg-tPrimary'></div>
</div>
<form class="text-center" method="POST">
	<SignInWithGoogleButton/>
</form>
</div>
