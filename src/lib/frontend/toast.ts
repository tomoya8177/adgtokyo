import { Toasts } from './store';

export const toast = (
	message: string,
	options: {
		position?: string;
		duration?: number;
		style?: string;
	} = {
		position: 'top-center',
		duration: 3000,
		style: 'success'
	}
) => {
	const origOptions = {
		position: 'top-center',
		duration: 4000,
		style: 'success'
	};
	options = Object.assign(origOptions, options);
	Toasts.update((toasts) => [
		...toasts,
		{
			message,
			options
		}
	]);
	setTimeout(() => {
		Toasts.update((toasts) => toasts.slice(1));
	}, options.duration);
};
