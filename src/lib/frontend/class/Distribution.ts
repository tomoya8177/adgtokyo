import { _ } from '../i18n';
import { toast } from '../toast';
import { DBObject } from './DBObject';

export class Distribution extends DBObject {
	year: string;
	regionLocal: string;
	regionEn: string;
	workId: string;
	weight: number;
	editing: boolean = false;
	constructor(data: any) {
		data.table = 'Distribution';
		super(data);
		this.year = data.year || '';
		this.regionLocal = data.regionLocal || '';
		this.regionEn = data.regionEn || '';
		this.workId = data.workId || '';
		this.weight = data.weight || 0;
	}
	validate(): boolean {
		if (!this.year) {
			toast(_('Year is required'), {
				style: 'error'
			});
			return false;
		}
		return true;
	}
}
