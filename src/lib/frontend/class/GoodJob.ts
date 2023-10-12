import { DBObject } from './DBObject';

export class GoodJob extends DBObject {
	hasEntityId: string;
	userId: string;
	constructor(data: any) {
		data.table = 'GoodJob';
		super(data);
		this.hasEntityId = data.hasEntityId || '';
		this.userId = data.userId || '';
	}
}
