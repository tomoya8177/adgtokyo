/**
 * The above function loads data from an API endpoint using Axios and returns the retrieved data.
 * @param  - - `api` is an instance of the `API` class from the `API.js` file in the `frontend/class`
 * directory.
 * @returns The function `load` is returning an object with a property `work` which contains the data
 * fetched from the API endpoint `/api/Work/{workId}`.
 */
import { api } from '$lib/frontend/class/API.js';
import axios from 'axios';

export const load = async ({ params }) => {
	console.log({ api });
	const work = await api.get('/api/Work/' + params.workId).then((res) => res.data);
	//const work = await axios.get('/api/Work/' + params.workId).then((res) => res.data);
	return {
		work
	};
};
