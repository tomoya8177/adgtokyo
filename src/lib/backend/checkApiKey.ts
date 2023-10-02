import { db } from './db';

export const checkApiKey = async (apiKey: string) => {
	const matchCount = (await db.query(`select * from ApiKey where apiKey='${apiKey}'`)).length;
	console.log({ matchCount });
	if (matchCount == 0) return false;
	return true;
};
