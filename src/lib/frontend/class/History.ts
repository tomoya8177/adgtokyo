import { DBObject } from './DBObject';

export class History extends DBObject {
	workId: string;
	action: string;
	target: string;
	userId: string;
	propertyId: string;
	entityId: string;
	propertyHasEntityId: string;
	from: string;
	to: string;
	constructor(data: any) {
		data.table = 'History';
		super(data);
		this.workId = data.workId || '';
		this.action = data.action || '';
		this.target = data.target || '';
		this.userId = data.userId || '';
		this.propertyId = data.propertyId || '';
		this.entityId = data.entityId || '';
		this.propertyHasEntityId = data.propertyHasEntityId || '';
		this.from = data.from || '';
		this.to = data.to || '';
	}
}
