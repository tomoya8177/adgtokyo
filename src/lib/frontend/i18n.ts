import languageData from '$lib/locales';
import { cookies } from './cookies';
class I18N {
	locale: string = 'en';
	data: any = {};
	constructor() {
		//get cookie
		const cookieLocale = cookies.get('locale');
		if (cookieLocale && cookieLocale != 'undefined') {
			this.locale = cookies.get('locale');
		} else {
			//get browser language
			if (typeof navigator == 'undefined' || !navigator) {
				this.locale = 'en';
			} else {
				const browserLanguage = navigator.language;
				if (browserLanguage) {
					this.locale = browserLanguage;
				} else {
					this.locale = 'en';
				}
			}
		}
		if (this.locale.length > 2) this.locale = this.locale.substring(0, 2);
		//if zh, then zh_CN
		if (this.locale == 'zh') this.locale = 'zh_CN';
		this.load();
	}
	load() {
		this.data = languageData[this.locale];
		//save cookie
		cookies.set('locale', this.locale, { expires: 365 });
	}
	async setLocale(locale: string) {
		this.locale = locale;
		this.load();
	}
	t(key: string) {
		//await this.load(this.locale);
		let value = this.data;
		if (!value) return key;
		value = value[key] || '';
		return value || key;
	}
}
export const lang = new I18N();

export const _ = (key: string) => lang.t(key);
