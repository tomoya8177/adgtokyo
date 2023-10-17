import { db } from '$lib/backend/db.js';
import prisma from '$lib/backend/prisma.js';

export const POST = async ({ request }) => {
	const { category, keywords, AND, justNames } = (await request.json()) as {
		category: string;
		keywords: string;
		AND: any;
		justNames: boolean;
	};
	let data: any[] = [];
	switch (category) {
		case 'work':
			data = await db.query('select * from Work where 1');
			break;
		case 'person':
		case 'business':
			//data = await db.query("select * from Entity where category='person'");
			data = await prisma.entity.findMany({
				where: {
					category
				},
				include: {
					filmographies: {
						include: {
							property: true
						}
					}
				}
			});
			break;
		case 'department':
			data = await db.query('select * from Department where 1');
			break;
		case 'property':
			data = await db.query('select * from Property where 1');
			break;
	}
	console.log({ data });
	if (!justNames && (category == 'person' || category == 'business')) {
		const promises = data.map(async (entity) => {
			const hasEntities = await db.query(
				`select * from PropertyHasEntity where entityId='${entity.id}'`
			);
			const properties = await db.query(
				`select * from Property where id in ('${hasEntities
					.map((hasEntity) => hasEntity.propertyId)
					.join("','")}')`
			);
			const credits: string[] = [];
			properties.forEach((property) => {
				credits.push(property.keyLocal);
				credits.push(property.keyEn);
			});
			entity.credits = credits
				.filter((value, index, self) => self.indexOf(value) === index)
				.join(', ');
			return entity;
		});
		data = await Promise.all(promises);
	}

	data = data.map((record) => ({ ...record, matchPoint: 0 }));
	keywords.split(' ').forEach((keyword: string) => {
		data = data
			.map((record) => {
				if (
					Object.values(record).some((value: any) => {
						if (typeof value !== 'string') return false;
						return value.toLowerCase().includes(keyword.toLowerCase());
					})
				) {
					record.matchPoint += 1;
				} else if (AND) {
					return false;
				}
				return record;
			})
			.filter((record) => record);
	});
	data = data.filter((record) => record.matchPoint > 0).sort((a, b) => b.matchPoint - a.matchPoint);
	console.log(data);
	return new Response(JSON.stringify(data));
};
