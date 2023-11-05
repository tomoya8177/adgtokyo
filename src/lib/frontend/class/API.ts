import { PUBLIC_API_ENDPOINT, PUBLIC_API_KEY } from '$env/static/public';
import axios from 'axios';

class API {
	token: string | null = null;
	api: any;
	constructor() {
		this.api = axios.create({
			baseURL: PUBLIC_API_ENDPOINT
		});

		this.api.interceptors.request.use((config) => {
			config.headers.Authorization = `Bearer ${this.token || PUBLIC_API_KEY}`;
			return config;
		});
	}
	setToken(token: string) {
		this.token = token;
	}
}
export const apiClass = new API();
export const api = apiClass.api;
