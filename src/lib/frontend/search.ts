import { api } from './class/API';

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
	}
	return results;
};
