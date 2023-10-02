import { DBObject } from './DBObject';
import { Property } from './Property';

export class Department extends DBObject {
	titleLocal: string;
	titleEn: string;
	properties: Property[] = [];
	weight: number;
	constructor(data) {
		data.table = 'Department';
		super(data);
		this.titleLocal = data.titleLocal || '';
		this.titleEn = data.titleEn || '';
		this.properties = data.properties || [new Property({})];
		this.weight = data.weight || 1;
	}
}
