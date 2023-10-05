import { writable } from 'svelte/store';
import { cookies } from './cookies';

export const User = writable({
	authenticated: undefined,
	profile: undefined
} as {
	authenticated: boolean | undefined;
	profile: any | undefined;
});

export const auth0 = writable(null as any);

export const onBottomNavButtonClicked = writable(null as any);
export const BottomNavButton = writable({
	label: '',
	onClick: () => {}
});

export const LocalEnSwitch = writable(cookies.get('localEng') || ('local' as 'local' | 'en'));
export const Toasts = writable([] as any[]);
export const ConfirmMessage = writable({
	open: false,
	message: '',
	result: false
} as {
	open: boolean;
	message: string;
	result: boolean | undefined;
});
