import { api } from '$lib/frontend/class/API';
import { locales } from '$lib/frontend/locales';
import ja from '$lib/locales/ja';
import * as fs from 'file-system';

export const GET = async () => {
	const jaString = JSON.stringify(ja);
	await Promise.all(
		locales.map(async (locale, index) => {
			if (locale.key == 'ja' || locale.key == 'en') return;
			const response = await api
				.post('/openai', {
					prompt: `translate the below ja.ts file to ${locale.key}. please make sure to return in the format of stringified JSON with { at the beginning and } at the end.
          :
        ${jaString}
        `
				})
				.then((res) => res.data);
			console.log({ response });
			const content = 'export default ' + response.content;
			//write to file
			fs.writeFile(`./src/lib/locales/${locale.key}.ts`, content, function (err) {
				if (err) return console.log(err);
				console.log(`wrote to ./src/lib/locales/${locale.key}.ts`);
			});
		})
	);
	return new Response('ok');
};
