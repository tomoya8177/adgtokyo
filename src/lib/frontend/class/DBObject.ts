import { api } from './API';

export class DBObject {
	table: string;
	id: string;
	constructor(data: any) {
		this.table = data.table;
		this.id = data.id || crypto.randomUUID();
	}
	update: (data: any) => Promise<any> = async (data) => {
		return await api.put(`/api/${this.table}/${this.id}`, data).then((res) => res.data);
	};
	delete: () => Promise<any> = async () => {
		return await api.delete(`/api/${this.table}/${this.id}`).then((res) => res.data);
	};
	create: () => Promise<any> = async () => {
		return await api.post(`/api/${this.table}`, this).then((res) => res.data);
	};
}
