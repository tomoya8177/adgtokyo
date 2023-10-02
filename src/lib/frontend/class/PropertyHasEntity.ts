import { DBObject } from './DBObject';
import { Entity } from './Entity';
import type { Organization } from './Organization';
import type { Person } from './Person';

export class PropertyHasEntity extends DBObject {
	entityId: string;
	entity: Person | Organization | null = null;
	subtextLocal: string;
	subtextEn: string;
	weight: number;

	constructor(data) {
		data.table = 'PropertyHasEntity';
		super(data);
		this.entity = data.entity || new Entity({});
		this.entityId = this.entity?.id || '';
		this.subtextLocal = data.subtextLocal || '';
		this.subtextEn = data.subtextEn || '';
		this.weight = data.weight || 1;
	}
}
