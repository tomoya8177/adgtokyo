import { cleanUpBody } from './cleanUpBody';
import { createQuery } from './createQuery';
import { db } from './db';
import { fixBoolean } from './fixBoolean';

export const createUpdateQuery = async (body: any, params: any): Promise<string> => {
	const fields = await db.fields(params.tableName);

	body = cleanUpBody(body, fields);

	const data = createQuery(body, fields);
	return data.join(',');
};
