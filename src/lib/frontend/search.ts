import { api } from './class/API';

export const search = async (keywords: string, category: string) => {
	let results = [];
	if (keywords) {
		console.log(keywords);
		results = await api
			.post('/search', {
				keywords: keywords.replace(/%20/g, ' '),
				category
			})
			.then((res) => res.data);
	}
	return results;
};
