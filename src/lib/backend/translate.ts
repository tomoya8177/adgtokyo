// Imports the Google Cloud client library
import { GOOGLE_API_KEY, DEEPL_API_KEY } from '$env/static/private';
import { v2 } from '@google-cloud/translate';
import * as deepl from 'deepl-node';
const { Translate } = v2;

const translator = new deepl.Translator(DEEPL_API_KEY);

// Creates a client
const translate = new Translate({
	key: GOOGLE_API_KEY
});

export async function translateText(text: string, target = 'en-US') {
	if (target == 'en') target = 'en-US';
	if (target == 'pt') target = 'pt-PT';
	if (target == 'zh_CN') target = 'zh';
	target = target as deepl.TargetLanguageCode;
	// Translates the text into the target language. "text" can be a string for
	// translating a single piece of text, or an array of strings for translating
	// multiple texts.
	console.log({ target });
	try {
		if (target == 'hi' || target == 'vi' || target == 'th') {
			// not supported by deepl
			let [translations] = await translate.translate(text, target);
			let translationsArr = Array.isArray(translations) ? translations : [translations];

			return translationsArr[0];
		} else {
			const result = await translator.translateText(text, null, target);
			return result.text;
		}
	} catch (error) {
		console.log('failed translation', target);
		return text;
	}
}
