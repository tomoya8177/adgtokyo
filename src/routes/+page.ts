import { api } from '$lib/frontend/class/API';

export const load = async () => {
	const works = await api
		.get('/api/Work?limit=20&orderBy=createdAt&order=DESC')
		.then((res) => res.data);
	const attachments = await api
		.get(
			`/api/Attachment?attachedTo=in:'${works.map((work) => work.id).join("','")}'&orderBy=weight`
		)
		.then((res) => res.data);
	return {
		works,
		attachments
	};
};
