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
			class="rounded-lg border border-tPrimary bg-primary px-2 py-2 indent-2 text-xl text-tPrimary"
		/>

		<label for="password"> Password </label>
		<input
			required
			name="password"
			type="password"
			class="rounded-lg border border-tPrimary bg-primary px-2 py-2 indent-2 text-xl text-tPrimary"
		/>
		<SecondaryButton style="width: 100%" title="Login"></SecondaryButton>
	</form>
	<div class="mt-4 flex items-center gap-2">
		<div class="h-px w-full bg-tPrimary"></div>
		<p class="text-sm">or</p>
		<div class="h-px w-full bg-tPrimary"></div>
	</div>
	<form class="text-center" method="POST">
		<SignInWithGoogleButton />
	</form>
	<p class="mt-4 text-center">
		Need an account? <a href="/auth/signup" class="text-blue-500 hover:underline">Sign up</a>
	</p>
</div>
