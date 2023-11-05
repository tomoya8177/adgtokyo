import { createInsertData } from '$lib/backend/createInsertData.js';
import { db } from '$lib/backend/db.js';
import { createFiltersFromParams } from '$lib/backend/createFiltersFromParams.js';
import { unlink } from 'fs/promises';
import { checkApiKey } from '$lib/backend/checkApiKey.js';
import type { ResultSetHeader } from 'mysql2/promise';

export async function GET({ request, params }) {
	// if (!(await checkApiKey(request.headers.get('Authorization')?.replace('Bearer ', '') || '')))
	// 	return new Response('not authorized', { status: 401 });
	const filter = await createFiltersFromParams(request, params);
	const query = `select * from ${params.tableName} where ${filter}`;
	const rows = await db.query(query);
	return new Response(JSON.stringify(rows));
}

export async function POST({ request, params }) {
	// if (!(await checkApiKey(request.headers.get('Authorization')?.replace('Bearer ', '') || '')))
	// 	return new Response('not authorized', { status: 401 });
	const id = crypto.randomUUID();
	const body = await request.json();
	if (!body.id) body.id = id;
	const data = await createInsertData(params, body);
	const result = await db.query(`insert ${params.tableName} set ${data}`);
	if (result.affectedRows > 0) {
		const rows = await db.query(`select * from ${params.tableName} where id='${body.id}'`);
		return new Response(JSON.stringify(rows[0]));
	}
	return new Response(JSON.stringify([]));
}

export async function DELETE({ request, params, cookies }) {
	// const checkResult = await Auth.check(cookies.get('login'));
	// if (!checkResult.result) {
	// 	return new Response('not authorized', { status: 401 });
	// }
	const filter = await createFiltersFromParams(request, params);
	if (!filter) return new Response(JSON.stringify(null));
	if (params.tableName == 'documentsForAI') {
		//delete actual files
		const rows = await db.query(`select * from ${params.tableName} where ${filter}`);
		for (let i = 0; i < rows.length; i++) {
			//elete local file without Deno
			const filePath = './static/documentsForAI/' + rows[i].filename;
			const res = await unlink(filePath);
		}
	}
	const result = await db.query(`delete from ${params.tableName} where ${filter}`);
	return new Response(JSON.stringify(result));
}
