import { db } from '$lib/backend/db';

export const load = async () => {
	const posts = await db.query(
		"select * from Post where status='published' order by createdAt desc"
	);
	return {
		posts
	};
};
