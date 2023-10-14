// Imports the Google Cloud client library
import { GOOGLE_API_KEY } from '$env/static/private';
import { v2 } from '@google-cloud/translate';
const { Translate } = v2;

// Creates a client
const translate = new Translate({
	key: GOOGLE_API_KEY
});

export async function translateText(text: string, target = 'en') {
	// Translates the text into the target language. "text" can be a string for
	// translating a single piece of text, or an array of strings for translating
	// multiple texts.
	let [translations] = await translate.translate(text, target);
	let translationsArr = Array.isArray(translations) ? translations : [translations];

	return translationsArr[0];
}
