import { checkApiKey } from '$lib/backend/checkApiKey.js';
import { createUpdateQuery } from '$lib/backend/createUpdateQuery.js';
import { db } from '$lib/backend/db.js';
import type { ResultSetHeader } from 'mysql2';

export async function GET({ params, cookies, request }) {
	// if (!(await checkApiKey(request.headers.get('Authorization')?.replace('Bearer ', '') || '')))
	// 	return new Response('not authorized', { status: 401 });

	const rows = (await db.query(
		`select * from ${params.tableName} where id='${params.id}'`
	)) as any[];

	return new Response(JSON.stringify(rows[0]));
}

export async function PUT({ request, params, cookies }) {
	// if (!(await checkApiKey(request.headers.get('Authorization')?.replace('Bearer ', '') || '')))
	// 	return new Response('not authorized', { status: 401 });
	const body = await request.json();

	const updates = await createUpdateQuery(body, params);
	if (!updates) return new Response(JSON.stringify(null));
	const result = (await db.query(
		`update ${params.tableName} set ${updates} where id='${params.id}'`
	)) as ResultSetHeader;
	if (result.affectedRows > 0) {
		const rows = (await db.query(
			`select * from ${params.tableName} where id='${params.id}'`
		)) as any[];
		return new Response(JSON.stringify(rows[0]));
	}
	return new Response(JSON.stringify(null));
}

export async function DELETE({ params, cookies, request }) {
	// if (!(await checkApiKey(request.headers.get('Authorization')?.replace('Bearer ', '') || '')))
	// 	return new Response('not authorized', { status: 401 });

	if (!params.id) {
		return new Response(JSON.stringify(null));
	}
	const rows = (await db.query(
		`delete from ${params.tableName} where id='${params.id}'`
	)) as ResultSetHeader;
	return new Response(JSON.stringify(rows.affectedRows));
}
