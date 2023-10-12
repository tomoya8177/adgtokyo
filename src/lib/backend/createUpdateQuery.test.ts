import { describe, expect, it } from 'vitest';
import { createUpdateQuery } from './createUpdateQuery';

describe('createUpdateQuery', () => {
	it('should create a valid update query', async () => {
		const body = {
			titleLocal: '日本語のタイトル',
			titleEn: 'English\'s "Title"',
			invalidField: 'dummyData',
			id: 'trying to override id'
		};
		const params = { tableName: 'Work' };
		const query = await createUpdateQuery(body, params);
		expect(query).toEqual(`titleLocal='日本語のタイトル',titleEn='English\\'s \"Title\"'`);
	});

	it('should handle null and undefined values', async () => {
		const body = {
			titleLocal: null,
			titleEn: undefined
		};
		const params = { tableName: 'Work' };
		const query = await createUpdateQuery(body, params);
		expect(query).toEqual('');
	});
});
