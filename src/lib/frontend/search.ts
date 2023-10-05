import { api } from './class/API';

export const search = async (keywords: string, category: string, AND: any = false) => {
	let results = [];
	if (keywords) {
		keywords = keywords
			.replace(/%20/g, ' ')
			.replace(/　/g, ' ')
			.replace(/\+/g, ' ')
			.replace(/,/g, ' ')
			.replace(/\./g, ' ')
			.trim();
		console.log({ keywords });
		results = await api
			.post('/search', {
				keywords,
				category,
				AND
			})
			.then((res) => res.data);
	}
	return results;
};
