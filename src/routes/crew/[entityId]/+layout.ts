import { api } from '$lib/frontend/class/API.js';
import type { Entity } from '$lib/frontend/class/Entity.js';

export const load = async ({ params }) => {
	return await api.get('/crew/' + params.entityId).then((res) => res.data);
};
