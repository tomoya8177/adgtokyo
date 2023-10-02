import { Entity } from './Entity';

export class Organization extends Entity {
	constructor(data: any) {
		data.category = 'Organization';
		super(data);
	}
}
