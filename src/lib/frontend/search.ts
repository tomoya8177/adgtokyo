import axios from 'axios';
import { api } from './class/API';
import { History } from './class/History';
import { me } from './class/User';

export const search = async (
	keywords: string,
	category: string,
	AND: any = false,
	justNames: boolean = false
) => {
	let results = [];
	if (keywords) {
		keywords = keywords
			.replace(/%20/g, ' ')
			.replace(/　/g, ' ')
			.replace(/\+/g, ' ')
			.replace(/,/g, ' ')
			.replace(/\./g, ' ')
			.replace(/\s+/g, ' ')
			.trim();
		results = await api
			.post('/search', {
				keywords,
				category,
				AND,
				justNames
			})
			.then((res) => res.data);
		await api.post('/api/History', {
			action: 'search',
			target: keywords,
			userId: me.id
		});
	}
	return results;
};
