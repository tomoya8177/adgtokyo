import type { Field } from 'mysql2';
import { fixBoolean } from './fixBoolean';

export const cleanUpBody = (
	body: any,
	fields: Array<{
		Field: string;
		Type: string;
		Null: string;
		Default: string;
	}>
) => {
	for (const field of fields) {
		if (body[field.Field] === undefined) continue;
		if (
			(field.Type.includes('int') || field.Type.includes('varchar') || field.Type == 'text') &&
			field.Null == 'NO' &&
			!body[field.Field] &&
			field.Field != 'id' &&
			field.Default == null
		) {
			body[field.Field] = field.Type.includes('int') ? 0 : '';
		}
		if (field.Type == 'date' && !body[field.Field]) {
			body[field.Field] = null;
		}
		if (field.Type == 'datetime' && !body[field.Field]) {
			body[field.Field] = null;
		}
		if (field.Type.includes('tinyint')) {
			body[field.Field] = fixBoolean(body[field.Field]);
		}
	}
	return body;
};
