import { translateText } from '$lib/backend/translate.js';

export const POST = async ({ request }) => {
	const { text, target } = await request.json();
	const translation = await translateText(text, target || 'en');
	return new Response(
		JSON.stringify({
			translation
		})
	);
};
