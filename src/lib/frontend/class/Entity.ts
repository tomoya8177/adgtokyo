import { DBObject } from './DBObject';
import { Department } from './Department';
import { Distribution } from './Distribution';
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
	}
	build({ works, hasEntities, properties, departments, distributions }) {
		this.hasEntities = hasEntities.map((hasEntity) => {
			hasEntity = new PropertyHasEntity(hasEntity);
			hasEntity.property = properties.find((property) => property.id == hasEntity.propertyId);
			hasEntity.property = new Property(hasEntity.property);
			hasEntity.department = departments.find(
				(department) => department.id == hasEntity.property.departmentId
			);
			hasEntity.department = new Department(hasEntity.department);
			hasEntity.work = works.find((work) => work.id == hasEntity.department.workId);
			hasEntity.work = new Work(hasEntity.work);
			hasEntity.distributions = distributions
				.filter((Distribution) => Distribution.workId == hasEntity.work.id)
				.map((distribution) => new Distribution(distribution));
			return hasEntity;
		});
		this.works = works.map((work) => {
			work = new Work(work);
			work.build({ hasEntities, properties, departments, distributions });
			return work;
		});
	}
	get username() {
		return this.slug || this.id.substring(0, 8) || '';
	}
}
