import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [],
	theme: {
		extend: {
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				bgPrimary: 'var(--color-bg-primary)',
				tPrimary: 'var(--color-text-primary)',
				tSecondary: 'var(--color-text-secondary)'
			}
		}
	}
} satisfies Config;
