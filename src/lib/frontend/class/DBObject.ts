import { api } from './API';

export class DBObject {
	table: string;
	id: string;
	constructor(data: any) {
		this.table = data.table;
		this.id = data.id || crypto.randomUUID();
	}
	update: (data: any) => Promise<any> = async (data) => {
		const { me } = await import('./User');

		await api.post('/api/History', {
			userId: me.id,
			action: 'update',
			target: this.table,
			targetId: this.id,
			toValue: JSON.stringify(data)
		});
		if (typeof gtag != 'undefined') {
			gtag('event', 'update', {
				event_category: this.table,
				event_label: this.id
			});
		}
		return await api.put(`/api/${this.table}/${this.id}`, data).then((res) => res.data);
	};
	delete: () => Promise<any> = async () => {
		const { me } = await import('./User');
		await api.post('/api/History', {
			userId: me.id,
			action: 'delete',
			target: this.table,
			targetId: this.id
		});
		if (typeof gtag != 'undefined') {
			gtag('event', 'delete', {
				event_category: this.table,
				event_label: this.id
			});
		}
		return await api.delete(`/api/${this.table}/${this.id}`).then((res) => res.data);
	};
	create: () => Promise<any> = async () => {
		const created = await api.post(`/api/${this.table}`, this).then((res) => res.data);
		this.id = created.id;
		const { me } = await import('./User');
		await api.post('/api/History', {
			userId: me.id,
			action: 'create',
			target: this.table,
			targetId: this.id,
			toValue: JSON.stringify(created)
		});
		if (typeof gtag != 'undefined') {
			gtag('event', 'create', {
				event_category: this.table,
				event_label: this.id
			});
		}
		return this;
	};
}
