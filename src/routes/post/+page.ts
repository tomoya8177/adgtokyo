import { api } from '$lib/frontend/class/API';

export const load = async () => {
	const posts = await api.get('/api/Post?orderBy=createdAt&order=desc').then((res) => res.data);
	return {
		posts
	};
};
