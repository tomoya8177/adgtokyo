import { api } from '$lib/frontend/class/API';
import { Content } from '$lib/frontend/class/Content.js';
import { Post } from '$lib/frontend/class/Post.js';

export const load = async ({ params }) => {
	let response = await api.get(`/post/${params.postId}/${params.locale}`).then((res) => res.data);
	const post = new Post(response.post);
	await post.getUser();
	post.content = new Content(response.content);

	return {
		post
	};
};
