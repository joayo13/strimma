import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultTheme = 'light';
const storedTheme = browser ? localStorage.getItem('theme') || defaultTheme : defaultTheme;

export const theme = writable(storedTheme);

// Only update localStorage if running in the browser
if (browser) {
	theme.subscribe((value) => {
		if (value) {
			localStorage.setItem('theme', value);
			document.documentElement.className = `theme-${value}`;
		}
	});
}
