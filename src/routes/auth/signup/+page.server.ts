import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { data, error } = await supabase.auth.signUp({ email, password });

		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		} else {
			// Check if email confirmation is needed
			console.log(data);
			if (data.user && data.user.user_metadata.email_verified === false) {
				// User needs to confirm email before logging in
				redirect(303, '/auth/confirm-email');
			} else {
				// User is already confirmed or auto-confirmation is enabled, log them in
				const { error } = await supabase.auth.signInWithPassword({ email, password });
				if (error) {
					console.error(error);
					redirect(303, '/auth/error');
				} else {
					redirect(303, '/');
				}
			}
		}
	},
	googleSignIn: async ({ request, locals: { supabase } }) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google', // specify the provider
			options: {
				redirectTo: 'https://10streak.netlify.app/auth/callback'
			}
		});

		if (data?.url) {
			redirect(303, data.url); // Ensure redirect is correctly implemented
		} else {
			console.error('OAuth Sign-in failed', error);
		}
	}
};
