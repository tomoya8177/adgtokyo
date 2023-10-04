import { _ } from '../i18n';
import { toast } from '../toast';
import { DBObject } from './DBObject';
import { PropertyHasEntity } from './PropertyHasEntity';

export class Property extends DBObject {
	hasEntities: PropertyHasEntity[] = [];
	keyLocal: string;
	keyEn: string;
	weight: number;
	departmentId: string;
	editing = false;
	createNew = false;
	switchToAnother = false;
	constructor(data: any) {
		data.table = 'Property';
		super(data);
		this.hasEntities = data.hasEntities || [];
		this.keyLocal = data.keyLocal || '';
		this.keyEn = data.keyEn || '';
		this.weight = data.weight || 1;
		this.departmentId = data.departmentId || '';
	}
	validate: () => boolean = () => {
		if (!this.keyLocal || !this.keyEn) {
			toast(_('Title is required'), {
				style: 'error'
			});
			return false;
		}
		return true;
	};
}
