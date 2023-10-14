export const getExcerpt = (html: string, length: number = 200) => {
	const excerpt = html.replace(/<[^>]*>?/gm, '').slice(0, length);
	return excerpt;
};
