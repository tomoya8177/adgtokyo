import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { ChatCompletionMessageParam } from 'openai/resources/index.js';
const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});
const chatHistory: ChatCompletionMessageParam[] = [];
export const POST = async ({ request }) => {
	const { prompt, withHistory } = await request.json();
	try {
		const response = await openai.images.generate({
			prompt: prompt,
			n: 4,
			size: '512x512'
		});
		console.log(response);
		return new Response(JSON.stringify(response.data));
	} catch (e) {
		console.log(e);
		return new Response(JSON.stringify({ error: e }));
	}
};
