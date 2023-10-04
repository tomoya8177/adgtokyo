import { api } from '$lib/frontend/class/API.js';

export const load = async ({ params }) => {
	const { person, properties, hasEntities, departments, works, distributions } = await api
		.get('/crew/' + params.entityId)
		.then((res) => res.data);
	return {
		person,
		properties,
		hasEntities,
		works,
		distributions,
		departments
	};
};
