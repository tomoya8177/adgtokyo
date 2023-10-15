import { api } from './API';
import { DBObject } from './DBObject';

export class Content extends DBObject {
	postId: string;
	title: string;
	body: string;
	locale: string;
	constructor(data: any) {
		data.table = 'Content';
		super(data);
		this.postId = data.postId || '';
		this.title = data.title || '';
		this.body = data.body || '';
		this.locale = data.locale || 'en';
	}
	async getTranslation(locale: string): Promise<{ title: string; body: string }> {
		const title = await api
			.post('/translate', {
				text: this.title,
				target: locale
			})
			.then((res) => res.data.translation);
		const body = await api
			.post('/openai', {
				prompt: `Translate below blog post to ${locale}. Keep the HTML tags in place so that it doesn't change the formatting.:
			${this.body}`
			})
			.then((res) => res.data.content);
		return { title, body };
	}
	get excerpt(): string {
		const excerpt = this.body.replace(/<[^>]*>?/gm, '').slice(0, 200);
		return excerpt;
	}
}
