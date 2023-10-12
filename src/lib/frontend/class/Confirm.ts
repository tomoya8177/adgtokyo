import { ConfirmMessage } from '../store';

let confirmMessage: any;
ConfirmMessage.subscribe((value) => (confirmMessage = value));
class Confirm {
	constructor(message: string) {
		ConfirmMessage.set({
			open: true,
			message: message,
			result: undefined
		});
	}

	get result(): boolean | undefined {
		return confirmMessage.result;
	}

	async resolve(): Promise<boolean> {
		return new Promise((resolve) => {
			const unsubscribe = ConfirmMessage.subscribe((value) => {
				if (!value.open || typeof value.result === 'undefined') return;

				// Unsubscribe from the ConfirmMessage store to avoid memory leaks
				unsubscribe();

				// Resolve the promise with the final result
				ConfirmMessage.set({
					open: false,
					message: '',
					result: undefined
				});
				resolve(value.result);
			});
		});
	}
}

export const myConfirm = async (message: string): Promise<boolean> => {
	const confirm = new Confirm(message);
	return confirm.resolve();
};
