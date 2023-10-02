import { Entity } from './Entity';

export class Person extends Entity {
	constructor(data: any) {
		data.category = 'Person';
		super(data);
	}
}
