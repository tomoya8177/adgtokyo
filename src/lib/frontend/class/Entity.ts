import { DBObject } from './DBObject';

export class Entity extends DBObject {
	category: 'Person' | 'Organization';
	constructor(data: any) {
		data.table = 'Entity';
		super(data);
		this.category = data.category;
	}
}
