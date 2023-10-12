import { describe, expect, it } from 'vitest';
import { translateText } from './translate';

describe('translateText', async () => {
	it('should return some translation', async () => {
		const resonse = await translateText('こんにちは');
		expect(resonse).toBeTypeOf('string');
	});
});
