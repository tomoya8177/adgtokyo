import { api } from '$lib/frontend/class/API.js';
import type { Work } from '$lib/frontend/class/Work.js';

export const load = async ({ params }) => {
	return await api.get(`/work/${params.workId}`).then((res) => res.data);
};
