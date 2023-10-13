import { locales } from '$lib/frontend/locales';
import { currentTimestamp } from '../currentTimestamp';
import { api } from './API';
import { Content } from './Content';
import { DBObject } from './DBObject';

export class Post extends DBObject {
	status: string;
	createdAt?: string;
	publicAt: string;
	userId: string;
	constructor(data: any) {
		data.table = 'Post';
		super(data);
		this.status = data.status || 'draft';
		this.publicAt = data.publicAt || currentTimestamp();
		this.userId = data.userId || '';
	}
	async generateOtherLocaleContentFrom(originalLocale: string) {
		const originalContent = await api
			.get('/api/Content?postId=' + this.id + '&locale=' + originalLocale)
			.then((res) => res.data[0]);
		console.log(originalContent);
		await Promise.all(
			locales.map(async (locale) => {
				if (locale.key == originalLocale) return;
				const title = await api
					.post('/translate', {
						text: originalContent.title,
						target: locale.key
					})
					.then((res) => res.data.translation);
				const body = await api
					.post('/translate', {
						text: originalContent.body,
						target: locale.key
					})
					.then((res) => res.data.translation);
				console.log({ title, body });
				const newContent = new Content({
					postId: this.id,
					locale: locale.key,
					title,
					body
				});
				await newContent.create();
			})
		);
	}
	async getContent(locale: string) {
		const content = await api
			.get('/api/Content?postId=' + this.id + '&locale=' + locale)
			.then((res) => res.data[0]);
		if (!content) return false;
		return new Content(content);
	}
}
