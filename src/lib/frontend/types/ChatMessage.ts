export type ChatMessage = {
	from: 'user' | 'ai';
	text: string;
	images?: {
		url: string;
	}[];
};
