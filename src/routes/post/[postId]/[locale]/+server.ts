import { db } from '$lib/backend/db.js';

export const GET = async ({ params }) => {
	const post = ((await db.query(`select * from Post where id='${params.postId}'`)) as any[])[0];
	const content = (
		(await db.query(
			`select * from Content where postId='${params.postId}' and locale='${params.locale}'`
		)) as any[]
	)[0];
	return new Response(JSON.stringify({ post, content }));
};
