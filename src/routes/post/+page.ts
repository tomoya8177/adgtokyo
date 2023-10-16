import { api } from '$lib/frontend/class/API';

export const load = async () => {
	const posts = await api.get('/api/Post?orderBy=publicOn&order=desc').then((res) => res.data);
	return {
		posts
	};
};
