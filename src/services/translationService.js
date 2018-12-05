import { handleErrors } from '../utils/errorHandling';
export const localeAPIUrl = 'http://' + window.location.hostname + ':5002/api/Locale';
export const translationAPIUrl = 'http://' + window.location.hostname + ':5002/api/Translation/';
export const customTranslationAPIUrl = 'http://' + window.location.hostname + ':5002/api/CustomTranslation/';
const TranslationService = {
	getLocales: () => {
		return fetch(localeAPIUrl)
			.then(handleErrors)
			.then(response => {
				return response.json();
			})
	},
	getTranslations: (locale) => {
		return fetch(translationAPIUrl + locale)
			.then(handleErrors)
			.then((response) => response.json());
	},
	updateCustomTranslation: (locale, tanslationKey, translationText) => {
		let urlEncodedKey = encodeURIComponent(tanslationKey).replace(/\./g, '%2E');
		return fetch(customTranslationAPIUrl + locale + '/' + urlEncodedKey,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'PUT',
				body: JSON.stringify({ text: translationText })
			})
			.then(response => {
				return response.json();
			})
	}
}

export default TranslationService;