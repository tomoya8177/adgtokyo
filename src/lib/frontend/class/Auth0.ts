import { PUBLIC_AUTH0_CLIENT_ID, PUBLIC_AUTH0_DOMAIN } from '$env/static/public';
import { createAuth0Client } from '@auth0/auth0-spa-js';
import { cookies } from '../cookies';

export default class Auth0 {
	client: any;
	constructor() {}
	init: () => Promise<void> = async () => {
		this.client = await createAuth0Client({
			domain: PUBLIC_AUTH0_DOMAIN,
			clientId: PUBLIC_AUTH0_CLIENT_ID,
			authorizationParams: {
				audience: 'https://adgtokyo.com',
				redirect_uri: window.location.origin + '/loginCallback'
			}
		});
	};
	async getTokenSilently() {
		return await this.client.getTokenSilently();
	}
	handleRedirectCallback: () => Promise<void> = async () => {
		await this.client.handleRedirectCallback();
	};
	login: () => Promise<void> = async () => {
		cookies.set('backTo', window.location.pathname);
		await this.client.loginWithRedirect();
	};
	logout: () => Promise<void> = async () => {
		cookies.set('backTo', '/');
		await this.client.logout();
	};
	check: () => Promise<boolean> = async () => {
		const response = await this.client.isAuthenticated();
		return response;
	};
	getUser: () => Promise<any> = async () => {
		const user = await this.client.getUser();
		return user;
	};
	changeEmail: (email: string) => Promise<void> = async (email: string) => {
		const response = await this.client.updateUser({ email });
	};
}
