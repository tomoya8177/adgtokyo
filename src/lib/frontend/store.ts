import { writable } from 'svelte/store';

export const User = writable({
	authenticated: undefined,
	profile: undefined
} as {
	authenticated: boolean | undefined;
	profile: any | undefined;
});

export const auth0 = writable(null as any);
