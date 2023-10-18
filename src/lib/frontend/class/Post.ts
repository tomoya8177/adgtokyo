import { locales } from '$lib/frontend/locales';
import { writable } from 'svelte/store';
import { toast } from '../toast';
import { api } from './API';
import { Content } from './Content';
import { DBObject } from './DBObject';
import { User } from './User';
import { DateTime } from 'luxon';

export class Post extends DBObject {
	status: string;
	userId: string;
	user?: User;
	publicOn: string;
	translatingLocales: number = 0;
	translatedLolaes: number = 0;
	content: Content;
	constructor(data: any) {
		data.table = 'Post';
		super(data);
		this.status = data.status || 'draft';
		this.userId = data.userId || '';
		this.publicOn = DateTime.fromISO(data.publicOn).toISODate() || DateTime.now().toISODate(); //
		this.content = data.content || new Content({});
	}

	async generateOtherLocaleContentFrom(originalLocale: string) {
		const originalContent = await this.getContent(originalLocale);
		if (!originalContent) return;
		this.translatingLocales = 0;
		this.translatedLolaes = 0;

		await Promise.all(
			locales.map(async (locale) => {
				if (locale.key == originalLocale) return;
				this.translatingLocales++;
				const { title, body } = await originalContent.getTranslation(locale.key);
				this.translatedLolaes += 0.5;
				this.updateProgress();

				console.log({ title, body });
				toast(locale.name + ' content created');
				const newContent = new Content({
					postId: this.id,
					locale: locale.key,
					title,
					body
				});
				await newContent.create();
				this.translatedLolaes += 0.5;
				this.updateProgress();
			})
		);
	}
	async updateOtherLocaleContentFrom(originalLocale: string) {
		const originalContent = await this.getContent(originalLocale);
		if (!originalContent) return;
		this.translatingLocales = 0;
		this.translatedLolaes = 0;
		this.updateProgress();

		await Promise.all(
			locales.map(async (locale) => {
				if (locale.key == originalLocale) return;
				this.translatingLocales++;
				const { title, body } = await originalContent.getTranslation(locale.key);
				this.translatedLolaes += 0.5;
				this.updateProgress();

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
				this.translatedLolaes += 0.5;
				this.updateProgress();
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
	updateProgress() {
		this.translatingProgress.set(this.translatedLolaes / this.translatingLocales);
	}
	translatingProgress = writable(0);
	// get translationProgress(): number {
	// 	return this.translatedLolaes / this.translatingLocales || 1;
	// }
}
