import { cleanUpBody } from './cleanUpBody';
import { createQuery } from './createQuery';
import { db } from './db';
import { fixBoolean } from './fixBoolean';

export const createInsertData = async (params: any, body: any): Promise<string> => {
	const fields = await db.fields(params.tableName);
	body = cleanUpBody(body, fields);
	const data = createQuery(body, fields, true);

	return data.join(',');
};
