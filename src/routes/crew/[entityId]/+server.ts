import { workCategory } from '$lib/Category.js';
import { db } from '$lib/backend/db.js';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	const entity = (await db.query(`select * from Entity where id='${params.entityId}'`))[0];
	if (!entity) {
		console.log('koko?');
		return new Response(
			JSON.stringify({
				entity: false
			})
		);
	}

	const weights = await db.query(
		`select * from WeightForEntity where entityId='${params.entityId}'`
	);
	const hasEntities = await db
		.query(`select * from PropertyHasEntity where entityId='${params.entityId}'`)
		.then((hasEntities) => {
			hasEntities = hasEntities.map((hasEntity, index) => {
				const existing = weights.find((w) => w.attachedTo === hasEntity.id);
				if (existing) {
					hasEntity.weight = existing.weight;
					hasEntity.weightId = existing.id;
				} else {
					const id = crypto.randomUUID();
					hasEntity.weight = index + 1;
					hasEntity.weightId = id;
					const newWeight = {
						id,
						entityId: params.entityId,
						attachedTo: hasEntity.id,
						weight: index + 1
					};
					weights.push(newWeight);
					hasEntity.weight = newWeight.weight;
					hasEntity.weightId = newWeight.id;

					db.query(
						`insert into WeightForEntity (id,entityId, attachedTo, weight) values ('${newWeight.id}','${newWeight.entityId}','${newWeight.attachedTo}',${newWeight.weight})`
					);
				}
				return hasEntity;
			});
			return hasEntities.sort((a, b) => (b.weight < a.weight ? 1 : -1));
		});

	const goodJobs = await db.query(
		`select * from GoodJob where hasEntityId in ('${hasEntities.map((h) => h.id).join("','")}')`
	);

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
			//filter duplicates
			departments = departments
				.filter((department, index, self) => self.findIndex((d) => d.id == department.id) == index)
				.map((department) => {
					department.weight = weights.find((w) => w.attachedTo === department.id)?.weight || 1;
					return department;
				})
				.sort((a, b) => b.weight - a.weight);
			return departments;
		});
	const newWeights: {
		[id: string]: number;
	} = {};
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
	const hasEntityGroupedByCategory: {
		[categoryTitle: string]: any[];
	} = {};
	workCategory.forEach((category) => {
		let index = 0;
		works
			.filter((work) => work.category == category.title)
			.forEach((work) => {
				departments
					.filter((department) => department.workId == work.id)
					.forEach((department) => {
						properties
							.filter((property) => property.departmentId == department.id)
							.forEach((property) => {
								index++;
								hasEntities
									.filter((hasEntity) => hasEntity.propertyId == property.id)
									.forEach((hasEntity) => {
										if (!hasEntityGroupedByCategory[category.title])
											hasEntityGroupedByCategory[category.title] = [];
										hasEntityGroupedByCategory[category.title].push(hasEntity);
									});
							});
					});
			});
	});
	Object.entries(hasEntityGroupedByCategory).forEach(([categoryTitle, hasEntities]) => {
		hasEntities.sort((a, b) => (b.weight < a.weight ? 1 : -1));
		hasEntities.forEach((hasEntity, index) => {
			newWeights[hasEntity.id] = index + 1;
		});
	});
	// update all hasEntities with new weight value
	hasEntities.forEach((hasEntity) => {
		if (hasEntity.weight == newWeights[hasEntity.id]) return;
		hasEntity.weight = newWeights[hasEntity.id];
		db.query(
			`update WeightForEntity set weight=${hasEntity.weight} where id='${hasEntity.weightId}'`
		);
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
			works,
			goodJobs
		})
	);
};
