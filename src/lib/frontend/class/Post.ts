import { locales } from '$lib/frontend/locales';
import { toast } from '../toast';
import { api } from './API';
import { Content } from './Content';
import { DBObject } from './DBObject';
import { User } from './User';

export class Post extends DBObject {
	status: string;
	userId: string;
	user?: User;
	constructor(data: any) {
		data.table = 'Post';
		super(data);
		this.status = data.status || 'draft';
		this.userId = data.userId || '';
	}

	async generateOtherLocaleContentFrom(originalLocale: string) {
		const originalContent = await this.getContent(originalLocale);
		if (!originalContent) return;
		await Promise.all(
			locales.map(async (locale) => {
				if (locale.key == originalLocale) return;
				const { title, body } = await originalContent.getTranslation(locale.key);
				console.log({ title, body });
				toast(locale.name + ' content created');
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
	async updateOtherLocaleContentFrom(originalLocale: string) {
		const originalContent = await this.getContent(originalLocale);
		if (!originalContent) return;
		await Promise.all(
			locales.map(async (locale) => {
				if (locale.key == originalLocale) return;
				const { title, body } = await originalContent.getTranslation(locale.key);

				console.log({ title, body });
				toast(locale.name + ' content updated');
				const contentToUpdate = await this.getContent(locale.key);
				if (!contentToUpdate) {
					//create new content
					const newContent = new Content({
						postId: this.id,
						locale: locale.key,
						title,
						body
					});
					await newContent.create();
				} else {
					contentToUpdate.title = title;
					contentToUpdate.body = body;
					await contentToUpdate.update({
						title,
						body
					});
				}
			})
		);
	}
	async getUser() {
		this.user = (await api.get('/api/User/' + this.userId).then((res) => res.data)) || new User({});
	}
	async getContent(locale: string) {
		const content = await api
			.get('/api/Content?postId=' + this.id + '&locale=' + locale)
			.then((res) => res.data[0]);
		if (!content) alert('No content found for locale ' + locale);
		if (!content) return false;
		return new Content(content);
	}
}
