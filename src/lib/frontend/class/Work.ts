import type { PageData } from '../../../routes/$types';
import { _ } from '../i18n';
import { toast } from '../toast';
import { Attachment } from './Attachments';
import { DBObject } from './DBObject';
import { Department } from './Department';
import { Distribution } from './Distribution';
import { Property } from './Property';
import { PropertyHasEntity } from './PropertyHasEntity';

export class Work extends DBObject {
	titleLocal: string;
	titleEn: string;
	departments: Department[];
	distributions: any[];
	attachments: Attachment[];
	editing: boolean = false;
	formatLocal: string;
	formatEn: string;
	descriptionLocal: string;
	descriptionEn: string;
	createdAt: any;
	imdbURL: string;
	officialWebsiteURL: string;
	videoURL: string;
	constructor(data: any) {
		data.table = 'Work';
		super(data);
		this.titleLocal = data.titleLocal || '';
		this.titleEn = data.titleEn || '';
		this.departments = data.departments || [];
		this.distributions = data.distributions || [];
		this.attachments = data.attachments || [];
		this.formatLocal = data.formatLocal || '';
		this.formatEn = data.formatEn || '';
		this.descriptionLocal = data.descriptionLocal || '';
		this.descriptionEn = data.descriptionEn || '';
		this.createdAt = data.createdAt || new Date();
		this.imdbURL = data.imdbURL || '';
		this.officialWebsiteURL = data.officialWebsiteURL || '';
		this.videoURL = data.videoURL || '';
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
	build({
		departments,
		properties,
		hasEntities,
		entities,
		distributions,
		attachments
	}: {
		departments: Department[];
		properties: Property[];
		hasEntities: PropertyHasEntity[];
		entities?: any[];
		distributions?: Distribution[];
		attachments?: Attachment[];
		editing?: boolean;
	}) {
		this.departments = departments
			.filter((department) => {
				return department.workId == this.id;
			})
			.map((department) => {
				department.properties = properties
					.filter((property) => property.departmentId == department.id)
					.map((property) => {
						property.hasEntities = hasEntities
							.filter((h) => h.propertyId == property.id)
							.map((hasEntity) => {
								hasEntity.entity = entities?.find((e) => e.id == hasEntity.entityId) || null;
								return new PropertyHasEntity(hasEntity);
							});
						return new Property(property);
					});
				return new Department(department);
			});
		this.distributions =
			distributions?.map((distribution) => {
				return new Distribution(distribution);
			}) || [];
		this.attachments =
			attachments?.map((attachment) => {
				return new Attachment(attachment);
			}) || [];
	}
}
