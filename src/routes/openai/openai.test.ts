import { api } from '$lib/frontend/class/API';
import { describe, expect, it } from 'vitest';

describe('openai', () => {
	it('should work with one prompt', async () => {
		const response = await api
			.post('/openai', {
				prompt: 'say this is a test',
				withHistory: false
			})
			.then((res) => res.data);
		expect(response.content).toBeTypeOf('string');
	});
	it('should accept questions in series', async () => {
		const response = await api
			.post('/openai', {
				prompt: 'My name is John.',
				withHistory: true,
				userid: 'test'
			})
			.then((res) => res.data);
		console.log({ response });
		expect(response.content).toBeTypeOf('string');
		const response2 = await api
			.post('/openai', {
				prompt: 'what is my name?',
				withHistory: true,
				userid: 'test'
			})
			.then((res) => res.data);
		console.log({ response2 });
		expect(response2.content.includes('John')).toBeTruthy();
	});
});
