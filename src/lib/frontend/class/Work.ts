import { DBObject } from './DBObject';
import { Department } from './Department';
import type { Property } from './Property';

export class Work extends DBObject {
	titleLocal: string;
	titleEn: string;
	departments: Department[] = [];
	constructor(data: any) {
		data.table = 'Work';
		super(data);
		this.titleLocal = data.titleLocal;
		this.titleEn = data.titleEn;
		this.departments = data.departments || [
			new Department({
				titleLocal: '美術部',
				titleEn: 'Art Department',
				weight: 1
			}),
			new Department({
				titleLocal: 'その他部署',
				titleEn: 'Other Department',
				weight: 2
			})
		];
	}
}
