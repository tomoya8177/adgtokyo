import { _ } from '../i18n';
import { toast } from '../toast';
import { DBObject } from './DBObject';
import type { Property } from './Property';

export class Department extends DBObject {
	titleLocal: string;
	titleEn: string;
	properties: Property[] = [];
	weight: number;
	workId: string;
	editing = false;
	createNew = false;
	switchToAnother = false;
	constructor(data) {
		data.table = 'Department';
		super(data);
		this.titleLocal = data.titleLocal || '';
		this.titleEn = data.titleEn || '';
		this.properties = data.properties || [];
		this.weight = data.weight || 1;
		this.workId = data.workId || '';
	}
	validate: () => boolean = () => {
		if (!this.titleLocal || !this.titleEn) {
			toast(_('Title is required'), {
				style: 'error'
			});
			return false;
		}
		return true;
	};
}
