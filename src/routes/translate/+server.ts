import { translateText } from '$lib/backend/translate.js';

export const POST = async ({ request }) => {
	const body = await request.json();
	const translation = await translateText(body.text, body.target || 'en');
	return new Response(
		JSON.stringify({
			translation
		})
	);
};
