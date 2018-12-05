import * as actions from '../userSettingsActions';
import * as types from '../userSettingsActionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchMock } from 'fetch-mock';

import {translationAPIUrl} from '../../services/translationService';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user settings actions', () => {
	it('should return action USER_SET_LOCALE', () => {
		const expectedAction = {
			type: types.USER_SET_LOCALE,
			locale: 'sv'
		};
		expect(actions.setLocale('sv')).toEqual(expectedAction);
	});

	it('should return action USER_SET_DATE_FORMAT', () => {
		const expectedAction = {
			type: types.USER_SET_DATE_FORMAT,
			locale: 'sv'
		};
		expect(actions.setDateFormat('sv')).toEqual(expectedAction);
	});  
});

describe('async app actions', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	it('creates USER_FETCH_TRANSLATIONS_SUCCESS when fetching translations has been done', () => {
		const payload = {
			body: {
				translations: {}
			}
		};
		let locale = 'sv';
		fetchMock.get(translationAPIUrl + locale, payload.body);
		const expectedActions = [{
			type: types.USER_FETCH_TRANSLATIONS
		},
		{
			type: types.USER_FETCH_TRANSLATIONS_SUCCESS,
			translations: payload.body
		}
		];
		const store = mockStore({
			userSettings: {
				translations: {}
			}
		});

		return store.dispatch(actions.getTranslations(locale)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('creates APP_LIST_APPS_FAILURE when fetching apps has been failed', () => {
		let locale = 'sv';
		fetchMock.get(translationAPIUrl + locale, 404);
		const expectedActions = [{
			type: types.USER_FETCH_TRANSLATIONS
		},
		{
			type: types.USER_FETCH_TRANSLATIONS_FAILURE,
			error: 'Not Found'
		}
		];
		const store = mockStore();

		return store.dispatch(actions.getTranslations(locale)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});  
});