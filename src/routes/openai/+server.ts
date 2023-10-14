import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { ChatCompletionMessageParam } from 'openai/resources/index.js';
const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});
const chatHistory: {
	[userId: string]: ChatCompletionMessageParam[];
} = {};
export const POST = async ({ request }) => {
	const { prompt, withHistory, userId } = await request.json();
	if (withHistory) {
		const history = chatHistory[userId];
		if (history) {
			history.push({
				role: 'user',
				content: prompt
			});
			chatHistory[userId] = history;
		} else {
			chatHistory[userId] = [
				{
					role: 'user',
					content: prompt
				}
			];
		}
	}
	const chatCompletion = await openai.chat.completions.create({
		messages:
			withHistory && chatHistory[userId]?.length
				? chatHistory[userId].slice(-20) //only get 20 last messages
				: [{ role: 'user', content: prompt }],
		model: 'gpt-3.5-turbo'
	});
	if (withHistory) {
		const history = chatHistory[userId];
		history.push(chatCompletion.choices[0].message);
		chatHistory[userId] = history;
	}
	return new Response(JSON.stringify({ content: chatCompletion.choices[0].message.content }));
};
