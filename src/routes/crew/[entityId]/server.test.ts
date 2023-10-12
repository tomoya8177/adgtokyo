import { db } from '$lib/backend/db';
import { api } from '$lib/frontend/class/API';
import { describe, expect, it } from 'vitest';

describe('Entity', async () => {
	it('should build the entity object correctly', async () => {
		const firstEntity = await db.query(`select * from Entity where 1 limit 1`);
		const { entity, distributions, departments, properties, hasEntities, works, goodJobs } =
			await api.get('/crew/' + firstEntity[0].id).then((res) => res.data);
		//entity should be an object
		expect(typeof entity).toBe('object');
		//distributions should be an array
		expect(Array.isArray(distributions)).toBe(true);
		//departments should be an array
		expect(Array.isArray(departments)).toBe(true);
		//properties should be an array
		expect(Array.isArray(properties)).toBe(true);
		//hasEntities should be an array
		expect(Array.isArray(hasEntities)).toBe(true);
		//works should be an array
		expect(Array.isArray(works)).toBe(true);
		//goodJobs should be an array
		expect(Array.isArray(goodJobs)).toBe(true);
	});
});
