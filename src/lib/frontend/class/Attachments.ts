import { DBObject } from './DBObject';

export class Attachment extends DBObject {
	handle: string;
	filename: string;
	url: string;
	mimetype: string;
	attachedTo: string;
	userId: string;
	weight: number;
	constructor(data: any) {
		data.table = 'Attachment';
		super(data);
		this.handle = data.handle || '';
		this.filename = data.filename || '';
		this.url = data.url || '';
		this.mimetype = data.mimetype || '';
		this.attachedTo = data.attachedTo || '';
		this.userId = data.userId || '';
		this.weight = data.weight || 0;
	}
	get thumbnailURL() {
		return `https://cdn.filestackcontent.com/resize=height:200/${this.handle}`;
	}
}
