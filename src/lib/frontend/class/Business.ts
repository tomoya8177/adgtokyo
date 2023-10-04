import { Entity } from './Entity';

export class Business extends Entity {
	constructor(data: any) {
		data.category = 'business';
		super(data);
	}
}
