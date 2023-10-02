import { PUBLIC_API_KEY } from '$env/static/public';
import axios from 'axios';

const api = axios.create({
	headers: {
		Authorization: `Bearer ${PUBLIC_API_KEY}`
	}
});
export { api };
