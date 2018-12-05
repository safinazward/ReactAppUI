

import * as types from './userSettingsActionTypes';
import TranslationService from '../services/translationService';

export const getTranslations = (locale) => (dispatch) => {
	dispatch({
		type: types.USER_FETCH_TRANSLATIONS
	});
	return TranslationService.getTranslations(locale)
		.then(translations => {
			dispatch({
				type: types.USER_FETCH_TRANSLATIONS_SUCCESS,
				translations
			});
		})
		.catch(error => dispatch({
			type: types.USER_FETCH_TRANSLATIONS_FAILURE,
			error: error.message
		}));
};


export const setLocale = locale => {
	return {
		type: types.USER_SET_LOCALE,
		locale
	};
};

export const setDateFormat = locale => {
	return {
		type: types.USER_SET_DATE_FORMAT,
		locale
	};
};

export const updateTranslation = (translationKey, text) => {
	return {
		type: types.USER_UPDATE_TRANSLATION,
		translationKey,
		text
	};
};
