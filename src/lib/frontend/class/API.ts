import { PUBLIC_API_ENDPOINT, PUBLIC_API_KEY } from '$env/static/public';
import axios from 'axios';

const api = axios.create({
	baseURL: PUBLIC_API_ENDPOINT,
	headers: {
		Authorization: `Bearer ${PUBLIC_API_KEY}`
	}
});
export { api };
