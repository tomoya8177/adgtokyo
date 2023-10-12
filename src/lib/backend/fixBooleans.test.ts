import { describe, expect, it } from 'vitest';
import { fixBoolean } from './fixBoolean';

describe('fixBooleans', () => {
	it('should return true to all these values', () => {
		const trues = [fixBoolean('true'), fixBoolean(true), fixBoolean('1'), fixBoolean(1)];
		trues.forEach((value) => expect(value).toBe(1));
	});
	it('should return false to all these values', () => {
		const falses = [fixBoolean('false'), fixBoolean(false), fixBoolean('0'), fixBoolean(0)];
		falses.forEach((value) => expect(value).toBe(0));
	});
});
