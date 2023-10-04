import { api } from '$lib/frontend/class/API.js';

export const load = async ({ params }) => {
	return await api.get(`/work/${params.workId}`).then((res) => res.data);
};
