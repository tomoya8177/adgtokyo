import { api } from '$lib/frontend/class/API.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const data = await api.get('/crew/' + params.entityId).then((res) => res.data);
	if (!data.entity) {
		throw redirect(307, '/');
	}
	return data;
};
