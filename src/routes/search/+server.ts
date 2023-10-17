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
							property: true,
							goodJobs: true
						}
					}
				}
			});
			data = data.map((entity) => {
				entity.credits = [];
				entity.totalGoodJobs = 0;
				entity.filmographies.forEach((filmography) => {
					console.log({ filmography });
					entity.credits.push(filmography.property.keyLocal);
					entity.credits.push(filmography.property.keyEn);
					entity.totalGoodJobs += filmography.goodJobs.length;
				});
				entity.credits = entity.credits
					.filter((value, index, self) => self.indexOf(value) === index)
					.join(', ');
				return entity;
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
	data = data
		.filter((record) => record.matchPoint > 0)
		.map((record) => {
			if (category === 'person' || category == 'business')
				record.matchPoint = record.matchPoint * (record.totalGoodJobs || 1);
			return record;
		})
		.sort((a, b) => b.matchPoint - a.matchPoint);
	console.log(data);
	return new Response(JSON.stringify(data));
};
