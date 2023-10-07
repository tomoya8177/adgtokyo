import { db } from '$lib/backend/db.js';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	const entity = (await db.query(`select * from Entity where id='${params.entityId}'`))[0];
	if (!entity) {
		return new Response(
			JSON.stringify({
				entity: false
			})
		);
	}

	const weights = await db.query(
		`select * from WeightForEntity where entityId='${params.entityId}'`
	);
	const promises = [];
	const hasEntities = await db
		.query(`select * from PropertyHasEntity where entityId='${params.entityId}'`)
		.then((hasEntities) => {
			hasEntities = hasEntities
				.map((hasEntity, index) => {
					hasEntity.weight = weights.find((w) => w.attachedTo === hasEntity.id)?.weight;
					hasEntity.weightId = weights.find((w) => w.attachedTo === hasEntity.id)?.id;
					if (!hasEntity.weight) {
						const id = crypto.randomUUID();
						hasEntity.weight = index + 1;
						hasEntity.weightId = id;
						promises.push(
							db.query(
								`insert into WeightForEntity (id,entityId, attachedTo, weight) values ('${id}','${
									params.entityId
								}','${hasEntity.id}',${index + 1})`
							)
						);
					}
					return hasEntity;
				})
				.sort((a, b) => (a.weight > b.weight ? 1 : -1));
			return hasEntities;
		});
	const properties: any[] = await db
		.query(
			`select * from Property where id in ('${hasEntities.map((h) => h.propertyId).join("','")}')`
		)
		.then((properties) => {
			properties = properties
				.map((property) => {
					property.weight = weights.find((w) => w.attachedTo === property.id)?.weight || 1;
					return property;
				})
				.sort((a, b) => b.weight - a.weight);

			return properties;
		});
	const departments = await db
		.query(
			`select * from Department where id in ('${properties
				.map((p) => p.departmentId)
				.join("','")}')`
		)
		.then((departments) => {
			departments = departments
				.map((department) => {
					department.weight = weights.find((w) => w.attachedTo === department.id)?.weight || 1;
					return department;
				})
				.sort((a, b) => b.weight - a.weight);
			return departments;
		});

	const works = await db
		.query(`select * from Work where id in ('${departments.map((d) => d.workId).join("','")}')`)
		.then((works) => {
			works = works
				.map((work) => {
					work.weight = weights.find((w) => w.attachedTo === work.id)?.weight || 1;
					return work;
				})
				.sort((a, b) => b.weight - a.weight);

			return works;
		});
	const workAttachments = await db.query(
		`select * from Attachment where attachedTo in ('${works.map((w) => w.id).join("','")}')`
	);
	works.forEach((work) => {
		work.attachments = workAttachments.filter((a) => a.attachedTo == work.id);
	});

	const distributions = await db.query(
		`select * from Distribution where workId in ('${works.map((w) => w.id).join("','")}')`
	);

	return new Response(
		JSON.stringify({
			entity,
			distributions,
			departments,
			properties,
			hasEntities,
			works
		})
	);
};
