import { auth0Management } from '$lib/backend/auth0.js';
import { checkApiKey } from '$lib/backend/checkApiKey.js';

export const GET = async ({ request, params, cookies }) => {
	console.log(request.headers.get('Authorization'));
	if (!(await checkApiKey(request.headers.get('Authorization')?.replace('Bearer ', '') || '')))
		return new Response('not authorized', { status: 401 });
	const user = await auth0Management.users.get({ id: params.userId }).then((res) => res.data);
	return new Response(JSON.stringify(user));
};
export const PUT = async ({ request, params, cookies }) => {
	//update user profile
	if (!(await checkApiKey(request.headers.get('Authorization')?.replace('Bearer ', '') || '')))
		return new Response('not authorized', { status: 401 });
	const body = await request.json();
	try {
		const user = await auth0Management.users
			.update({ id: params.userId }, body)
			.then((res) => res.data);
		return new Response(JSON.stringify(user));
	} catch (e) {
		return new Response(JSON.stringify(e));
	}
};

export const POST = async ({ request, params, cookies }) => {
	//add user an email
	if (!(await checkApiKey(request.headers.get('Authorization')?.replace('Bearer ', '') || '')))
		return new Response('not authorized', { status: 401 });
	const body = await request.json();
	const user = await auth0Management.users.create(body).then((res) => res.data);
	return new Response(JSON.stringify(user));
};
