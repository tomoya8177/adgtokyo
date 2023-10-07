import { writable } from 'svelte/store';
import { cookies } from './cookies';
import type { Work } from './class/Work';

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
	busy: false,
	onClick: () => {}
} as {
	label: string;
	busy?: boolean;
	onClick: () => void;
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
export const UpdatedData = writable(null as any);
export const workOnFocus = writable(null as any);
export const entityOnFocus = writable(null as null | Work);
