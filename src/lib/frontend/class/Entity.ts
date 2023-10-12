import { api } from './API';
import type { Attachment } from './Attachments';
import { DBObject } from './DBObject';
import { Department } from './Department';
import { GoodJob } from './GoodJob';
import { Property } from './Property';
import { PropertyHasEntity } from './PropertyHasEntity';
import type { User } from './User';
import { Work } from './Work';
export type Filmography = {};
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
	filmographies: PropertyHasEntity[];
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
		this.attachments = data.attachments || [];
		this.filmographies = data.filmographies || [];
	}
	build({ works, hasEntities, properties, departments, distributions, goodJobs }) {
		this.filmographies = hasEntities
			.map((hasEntity) => {
				hasEntity = new PropertyHasEntity(hasEntity);
				hasEntity.goodJobs = goodJobs
					.filter((goodJob) => goodJob.hasEntityId == hasEntity.id)
					.map((goodJob) => new GoodJob(goodJob));
				hasEntity.property = properties.find((property) => property.id == hasEntity.propertyId);
				if (!hasEntity.property) {
					api.delete('/api/PropertyHasEntity/' + hasEntity.id);
					return false;
				}
				hasEntity.property = new Property(hasEntity.property);
				hasEntity.department = departments.find(
					(department) => department.id == hasEntity.property.departmentId
				);
				if (!hasEntity.department) {
					api.delete('/api/Property/' + hasEntity.property.id);
					return false;
				}
				hasEntity.department = new Department(hasEntity.department);
				hasEntity.work = works.find((work) => work.id == hasEntity.department.workId);
				if (!hasEntity.work) {
					api.delete('/api/Department/' + hasEntity.department.id);
					return false;
				}
				hasEntity.work = new Work(hasEntity.work);
				hasEntity.work.build({ attachments: hasEntity.work.attachments });
				if (hasEntity.work.attachments.length > 0) {
					this.attachments = [...this.attachments, hasEntity.work.attachments[0]];
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
		const titles = this.filmographies.map((hasEntity) => {
			if (!hasEntity.property) return { local: '', en: '' };
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
	get totalGoodJobs(): number {
		let count = 0;
		this.filmographies.forEach((hasEntity) => {
			count += hasEntity.goodJobs.length;
		});
		return count;
	}
	get isOwnedByUser(): Promise<User | false> {
		return api.get('/api/User?entityId=' + this.id).then((res) => res.data[0] || false);
	}
}
