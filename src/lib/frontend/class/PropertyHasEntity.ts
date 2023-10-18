import { _ } from '../i18n';
import { toast } from '../toast';
import { DBObject } from './DBObject';
import type { Department } from './Department';
import type { Distribution } from './Distribution';
import type { Entity } from './Entity';
import { Property } from './Property';
import type { Work } from './Work';

export class PropertyHasEntity extends DBObject {
	entityId: string;
	entity: Entity | null = null;
	subtextLocal: string;
	subtextEn: string;
	weight: number;
	propertyId: string;
	editing: boolean = false;
	weightId: string;
	goodJobs: any[];
	//property for filmography
	department: Department | null;
	property: Property | null = null;
	work: Work | null = null;
	distributions: Distribution[];
	anew: boolean;
	constructor(data: any) {
		data.table = 'PropertyHasEntity';
		super(data);
		this.entity = data.entity || null;
		this.entityId = this.entity?.id || data.entityId || '';
		this.subtextLocal = data.subtextLocal || '';
		this.subtextEn = data.subtextEn || '';
		this.weight = data.weight || 1;
		this.propertyId = data.propertyId || '';
		this.weightId = data.weightId || '';
		this.goodJobs = data.goodJobs || [];
		this.department = data.department || null;
		this.property = data.property || null;
		this.work = data.work || null;
		this.distributions = data.distributions || [];
		this.anew = data.anew || false;
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
