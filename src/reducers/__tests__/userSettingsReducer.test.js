import {
	reducer,
	userSettingsState
} from '../userSettingsReducer';
import * as userActionTypes from '../../actions/userSettingsActionTypes';



describe('User settings reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(userSettingsState);
	});

	it('should handle USER_FETCH_TRANSLATIONS_SUCCESS', () => {
		expect(reducer({}, {
			type: userActionTypes.USER_FETCH_TRANSLATIONS_SUCCESS,
			translations: {'app.welcome':{text:'Welcome!'}}
		})).toEqual({
			translations:{'app.welcome':'Welcome!'}
		});
	});

	it('should handle USER_SET_LOCALE', () => {
		expect(reducer({}, {
			type: userActionTypes.USER_SET_LOCALE,
			locale:'sv'
		})).toEqual({
			locale: 'sv' 
		});
	});

	it('should handle USER_SET_DATE_FORMAT', () => {
		expect(reducer({}, {
			type: userActionTypes.USER_SET_DATE_FORMAT,
			locale:'sv'
		})).toEqual({
			dateFormat: 'sv' 
		});
	});

	it('should handle USER_UPDATE_TRANSLATION', () => {
		expect(reducer({}, {
			type: userActionTypes.USER_UPDATE_TRANSLATION,
			translationKey:'apptitle',
			text:'title'
		})).toEqual({
			translations: {apptitle:'title'} 
		});
	});

});