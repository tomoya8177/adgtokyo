import { db } from '$lib/backend/db.js';

export const POST = async ({ request }) => {
	const { category, keywords, AND } = (await request.json()) as {
		category: string;
		keywords: string;
		AND: any;
	};
	let data: any[] = [];
	switch (category) {
		case 'work':
			data = await db.query('select * from Work where 1');
			break;
		case 'person':
			data = await db.query("select * from Entity where category='person'");
			break;
		case 'business':
			data = await db.query("select * from Entity where category='business'");
			break;
	}
	data = data.map((record) => ({ ...record, matchPoint: 0 }));
	console.log(data.length);
	console.log({ keywords });
	keywords
		.replace(/　/g, ' ')
		.replace(/\+/g, ' ')
		.split(' ')
		.forEach((keyword: string) => {
			data = data
				.map((record) => {
					if (
						Object.values(record).some((value: any) => {
							if (typeof value !== 'string') return false;
							// console.log({ value, keyword });
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
	console.log({ data });
	return new Response(JSON.stringify(data));
};
