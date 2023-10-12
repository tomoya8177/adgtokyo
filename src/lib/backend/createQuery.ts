export const createQuery = (
	body: any,
	fields: Array<{
		Field: string;
		Type: string;
		Null: string;
		Default: string;
	}>,
	create: boolean = false
) => {
	const data = [];
	for (let [key, value] of Object.entries(body)) {
		if (key == 'ai') continue;
		if (create && key == 'id' && !value) continue;
		if (!create && key == 'id') continue;
		if (!fields.some((field) => field.Field == key)) continue;
		if (value === null || typeof value === 'undefined') continue;
		if (value.toString().includes('.000Z')) value = value.toString().replace('.000Z', '');
		if (typeof value == 'string') value = value.replace(/(?<!\\)'/g, "\\'");
		data.push(`${key}='${value}'`);
	}
	return data;
};
