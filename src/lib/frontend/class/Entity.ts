import type { Attachment } from './Attachments';
import { DBObject } from './DBObject';
import { Department } from './Department';
import { Property } from './Property';
import { PropertyHasEntity } from './PropertyHasEntity';
import { Work } from './Work';

export class Entity extends DBObject {
	nameLocal: string;
	nameEn: string;
	slug: string;
	userId: string;
	category: 'person' | 'business' | null;
	works: Work[];
	descriptionLocal: string;
	descriptionEn: string;
	editing: boolean = false;
	imdbURL: string;
	officialWebsiteURL: string;
	hasEntities: PropertyHasEntity[];
	attachments: Attachment[];
	constructor(data: any) {
		data.table = 'Entity';
		super(data);
		this.category = data.category;
		this.nameLocal = data.nameLocal || '';
		this.nameEn = data.nameEn || '';
		this.slug = data.slug || '';
		this.userId = data.userId || '';
		this.category = data.category || null;
		this.works = data.works || [];
		this.descriptionLocal = data.descriptionLocal || '';
		this.descriptionEn = data.descriptionEn || '';
		this.imdbURL = data.imdbURL || '';
		this.officialWebsiteURL = data.officialWebsiteURL || '';
		this.hasEntities = data.hasEntities || [];
		this.attachments = data.attachments || [];
	}
	build({ works, hasEntities, properties, departments, distributions }) {
		this.hasEntities = hasEntities
			.map((hasEntity) => {
				hasEntity = new PropertyHasEntity(hasEntity);
				hasEntity.property = properties.find((property) => property.id == hasEntity.propertyId);
				hasEntity.property = new Property(hasEntity.property);
				hasEntity.department = departments.find(
					(department) => department.id == hasEntity.property.departmentId
				);
				hasEntity.department = new Department(hasEntity.department);
				hasEntity.work = works.find((work) => work.id == hasEntity.department.workId);
				hasEntity.work = new Work(hasEntity.work);
				hasEntity.work.build({ attachments: hasEntity.work.attachments });
				if (hasEntity.work.attachments.length > 0) {
					this.attachments = [...this.attachments, hasEntity.work.attachments[0]];
				}

				if (!hasEntity.work) {
					return false;
				}
				hasEntity.distributions = distributions.filter(
					(distribution) => distribution.workId == hasEntity.work.id
				);
				return hasEntity;
			})
			.filter((hasEntity) => hasEntity);
	}
	get username() {
		return this.slug || this.id.substring(0, 8) || '';
	}
	get popularCreditTitles(): { local: string; en: string }[] {
		const titles = this.hasEntities.map((hasEntity) => {
			return { local: hasEntity.property.keyLocal, en: hasEntity.property.keyEn };
		});
		//remove duplicates, and sort by occurances desc
		return (
			titles
				.filter((title, index, self) => self.findIndex((t) => t.local == title.local) == index)
				.sort((a, b) => {
					return (
						titles.filter((title) => title.local == b.local).length -
						titles.filter((title) => title.local == a.local).length
					);
				})
				//just return top 3
				.slice(0, 3)
		);
	}
}
