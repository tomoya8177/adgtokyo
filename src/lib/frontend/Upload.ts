import { PUBLIC_FileStackAPIKey } from '$env/static/public';
import * as filestack from 'filestack-js';
const client = filestack.init(PUBLIC_FileStackAPIKey);

export const openPicker = async (callback) => {
	const options = {
		maxFiles: 20,
		uploadInBackground: false,
		accept: ['image/*'],
		onUploadDone: (res) => {
			console.log(res);
			callback(res.filesUploaded);
		}
	};
	client.picker(options).open();
};
export const upload = async (file: File) => {
	const res = await client.upload(file);
	return res.url;
};
