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
}
