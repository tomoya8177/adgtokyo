import { api } from '$lib/frontend/class/API';
import { describe, expect, it } from 'vitest';

describe('openai image generator', () => {
	//set timeout longer
	it(
		'should work with one prompt',
		async () => {
			const responses = await api
				.post('/openai/image', {
					prompt: 'white cat'
				})
				.then((res) => res.data);
			console.log({ responses, res: responses.map((res) => res.url) });
			expect(responses).toBeTypeOf('object');
		},
		{
			timeout: 10000
		}
	);
});
