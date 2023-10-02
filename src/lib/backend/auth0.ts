import {
	AUTH0_BACKEND_CLIENT_ID,
	AUTH0_BACKEND_DOMAIN,
	AUTH0_BACKEND_SECRET
} from '$env/static/private';
import { ManagementClient } from 'auth0';

const management = new ManagementClient({
	domain: AUTH0_BACKEND_DOMAIN,
	clientId: AUTH0_BACKEND_CLIENT_ID,
	clientSecret: AUTH0_BACKEND_SECRET
});
export { management as auth0Management };
