import * as userActionTypes from '../actions/userSettingsActionTypes';

export const userSettingsState = {
	locale:'',  
	dateFormat:'',
	translations:null
};

export const reducer = (state = {
	...userSettingsState
}, action) => {
	switch (action.type) {
	case userActionTypes.USER_FETCH_TRANSLATIONS_SUCCESS:    
		let trans = action.translations;
		let k = Object.keys(trans);
		let v = Object.values(trans).map(key=>key.text);
		let result = {};
		k.forEach((key, i) => result[key] = v[i]);        
		return {
			...state,
			translations: result
		};

	case userActionTypes.USER_SET_LOCALE:
		return {
			...state,
			locale:action.locale
		}

	case userActionTypes.USER_SET_DATE_FORMAT:
		return {
			...state,
			dateFormat:action.locale
		}

	case userActionTypes.USER_UPDATE_TRANSLATION:    
		let newTranslations= {...state.translations};
		newTranslations[action.translationKey] = action.text;
		return {
			...state,
			translations: newTranslations
		}
	default:
		return state;
	}
};

export default reducer;