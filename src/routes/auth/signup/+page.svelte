<script lang="ts">
	import PrimaryButton from '../../../components/buttons/PrimaryButton.svelte';
	import SecondaryButton from '../../../components/buttons/SecondaryButton.svelte';
	import SignInWithGoogleButton from '../../../components/buttons/SignInWithGoogleButton.svelte';

	let password = '';
	let confirmPassword = '';
	let error = '';

	function handleSubmit(event: SubmitEvent) {
		if (password !== confirmPassword) {
			event.preventDefault();
			error = 'Passwords do not match';
		} else {
			error = '';
		}
	}
</script>

<div>
	<form class="flex flex-col gap-2" method="POST" action="?/signup" on:submit={handleSubmit}>
		{#if error}
			<div class="text-sm text-red-500">{error}</div>
		{/if}
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
			bind:value={password}
			class="rounded-lg border border-tPrimary bg-primary px-2 py-2 indent-2 text-xl text-tPrimary"
		/>

		<label for="confirmPassword"> Confirm Password </label>
		<input
			required
			name="confirmPassword"
			type="password"
			bind:value={confirmPassword}
			class="rounded-lg border border-tPrimary bg-primary px-2 py-2 indent-2 text-xl text-tPrimary"
		/>

		<div class="flex justify-center">
			<SecondaryButton style="width: 100%" title="Sign Up"></SecondaryButton>
		</div>
	</form>
	<div class="mt-4 flex items-center gap-2">
		<div class="h-px w-full bg-tPrimary"></div>
		<p class="text-sm">or</p>
		<div class="h-px w-full bg-tPrimary"></div>
	</div>
	<form class="text-center" method="POST">
		<SignInWithGoogleButton />
	</form>
	<div class="mt-4 text-center">
		<p>
			Already have an account? <a href="/auth" class="text-blue-500 hover:underline">Sign in</a>
		</p>
	</div>
</div>
