import { db } from '$lib/backend/db.js';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	const work = (await db.query(`select * from Work where id='${params.workId}'`))[0];
	if (!work) throw redirect(307, '/');
	const departments = await db.query(
		`select * from Department where workId='${work.id}' order by weight`
	);
	const properties = await db.query(
		`select * from Property where departmentId in ('${departments
			.map((d) => d.id)
			.join("','")}') order by weight`
	);
	const hasEntities = await db.query(
		`select * from PropertyHasEntity where propertyId in ('${properties
			.map((p) => p.id)
			.join("','")}') order by weight`
	);
	const entities = await db.query(
		`select * from Entity where id in ('${hasEntities.map((h) => h.entityId).join("','")}')`
	);
	const distributions = await db.query(`select * from Distribution where workId='${work.id}'`);
	const attachments = await db.query(
		`select * from Attachment where attachedTo='${work.id}' order by weight`
	);
	return new Response(
		JSON.stringify({
			work,
			departments,
			properties,
			hasEntities,
			entities,
			distributions,
			attachments
		})
	);
};
