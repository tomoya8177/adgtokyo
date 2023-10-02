import { DBObject } from './DBObject';
import { PropertyHasEntity } from './PropertyHasEntity';

export class Property extends DBObject {
	hasEntities: PropertyHasEntity[] = [];
	keyLocal: string;
	keyEn: string;
	weight: number;
	constructor(data: any) {
		data.table = 'Property';
		super(data);
		this.hasEntities = data.hasEntities || [new PropertyHasEntity({})];
		this.keyLocal = data.keyLocal || '';
		this.keyEn = data.keyEn || '';
		this.weight = data.weight || 1;
	}
}
