import { DBObject } from './DBObject';

export class User extends DBObject {
	subscription: string;
	nickname: string;
	picture: string;
	constructor(data: any) {
		data.table = 'User';
		super(data);
		this.subscription = data.subscription || '';
		this.nickname = data.nickname || '';
		this.picture = data.picture || '';
	}
	get isPro(): boolean {
		return this.subscription == 'pro';
	}
}
