import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-primary)",
				bgPrimary: "var(--color-bg-primary)",
				tBase: "var(--color-text-base)"
			}
		}
	}
} satisfies Config;
