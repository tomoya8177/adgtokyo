import { writable } from 'svelte/store';

export const PromptMessage = writable({
	message: '',
	open: false,
	value: undefined
} as {
	message: string;
	open: boolean;
	value: string | undefined;
});
let promptMessage: any;
PromptMessage.subscribe((value) => (promptMessage = value));

class Prompt {
	constructor(message: string) {
		PromptMessage.set({
			open: true,
			message: message,
			value: undefined
		});
	}

	get result(): string | undefined {
		return promptMessage.value;
	}

	async resolve(): Promise<string> {
		return new Promise((resolve) => {
			const unsubscribe = PromptMessage.subscribe((value) => {
				if (!value.open || typeof value.value === 'undefined') return;

				// Unsubscribe from the ConfirmMessage store to avoid memory leaks
				unsubscribe();

				// Resolve the promise with the final result
				PromptMessage.set({
					open: false,
					message: '',
					value: undefined
				});
				resolve(value.value);
			});
		});
	}
}

export const myPrompt = async (message: string): Promise<string> => {
	const confirm = new Prompt(message);
	return confirm.resolve();
};
