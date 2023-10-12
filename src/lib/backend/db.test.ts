import { describe, expect, it } from 'vitest';
import { db } from './db';

describe('db test', () => {
	it('will load some work information', async () => {
		const works = await db.query(`select * from Work`);
		expect(works.length).toBeGreaterThan(0);
		const work = works[0];
		expect(work.id).toBeTypeOf('string');
		expect(work.titleLocal).toBeTypeOf('string');
	});
	it('can list fields of a table', async () => {
		const fields = await db.fields('Work');
		expect(fields.length).toBeGreaterThan(0);
		const idField = fields.find((field) => field.Field == 'id');
		expect(idField).toBeDefined();
		expect(idField.Key).toBe('PRI');
	});
});
