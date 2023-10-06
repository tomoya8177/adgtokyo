import { _ } from '../i18n';
import { toast } from '../toast';
import { DBObject } from './DBObject';
import type { Entity } from './Entity';

export class PropertyHasEntity extends DBObject {
	entityId: string;
	entity: Entity | null = null;
	subtextLocal: string;
	subtextEn: string;
	weight: number;
	propertyId: string;
	editing: boolean = false;
	weightId: string;

	constructor(data) {
		data.table = 'PropertyHasEntity';
		super(data);
		this.entity = data.entity || null;
		this.entityId = this.entity?.id || data.entityId || '';
		this.subtextLocal = data.subtextLocal || '';
		this.subtextEn = data.subtextEn || '';
		this.weight = data.weight || 1;
		this.propertyId = data.propertyId || '';
		this.weightId = data.weightId || '';
	}
	validate: () => {} = (): boolean => {
		if (!this.entityId) {
			toast(_('Entity needs to be registered'), {
				style: 'error'
			});
			return false;
		}
		return true;
	};
}
