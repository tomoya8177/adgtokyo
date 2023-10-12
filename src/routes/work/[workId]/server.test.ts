import { db } from '$lib/backend/db';
import { api } from '$lib/frontend/class/API';
import { describe, expect, it } from 'vitest';

describe('Work', async () => {
	it('should build the work object correctly', async () => {
		const firstWork = await db.query(`select * from Work where 1 limit 1`);
		const {
			work,
			departments,
			properties,
			hasEntities,
			entities,
			distributions,
			attachments,
			goodJobs
		} = await api.get('/work/' + firstWork[0].id).then((res) => res.data);
		//work should be an object
		expect(typeof work).toBe('object');
		//departments should be an array
		expect(Array.isArray(departments)).toBe(true);
		//all departments should have a workId that matches the work.id
		expect(departments.every((department) => department.workId == work.id)).toBe(true);
		//properties should be an array
		expect(Array.isArray(properties)).toBe(true);
		//hasEntities should be an array
		expect(Array.isArray(hasEntities)).toBe(true);
		//entities should be an array
		expect(Array.isArray(entities)).toBe(true);
		//distributions should be an array
		expect(Array.isArray(distributions)).toBe(true);
		//attachments should be an array
		expect(Array.isArray(attachments)).toBe(true);
		//goodJobs should be an array
		expect(Array.isArray(goodJobs)).toBe(true);
	});
});
