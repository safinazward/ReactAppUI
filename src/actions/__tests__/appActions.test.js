import * as actions from '../appActions';
import * as types from '../appActionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	fetchMock
} from 'fetch-mock';

import {appAPIUrl} from '../../services/appService';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('app actions', () => {
	it('should return action APP_SET_ELEMENT_STATE', () => {
		const expectedAction = {
			type: types.APP_SET_ELEMENT_STATE,
			id: 'elId',
			changes: {
				name: 'el'
			}
		};
		expect(actions.setElementState('elId', {
			name: 'el'
		})).toEqual(expectedAction);
	});

	it('should return action APP_REMOVE_ELEMENT_STATE', () => {
		const expectedAction = {
			type: types.APP_REMOVE_ELEMENT_STATE,
			id: 'elId'
		};
		expect(actions.removeElementState('elId')).toEqual(expectedAction);
	});

	it('should return action APP_SET_CUSTOM_COLOR', () => {
		const expectedAction = {
			type: types.APP_SET_CUSTOM_COLOR,
			id: 'primaryColor',
			customColor: '#44ff44'
		};
		expect(actions.setCustomColor('primaryColor', '#44ff44')).toEqual(expectedAction);
	});

	it('should return action APP_ADD_DATASOURCE', () => {
		const expectedAction = {
			type: types.APP_ADD_DATASOURCE,
			name: 'ds',
			url: '/api',
			token: 'token'
		};
		expect(actions.addDatasource('ds', '/api', 'token')).toEqual(expectedAction);
	});

	it('should return action APP_REMOVE_DATASOURCE', () => {
		const expectedAction = {
			type: types.APP_REMOVE_DATASOURCE,
			name: 'ds'
		};
		expect(actions.removeDatasource('ds')).toEqual(expectedAction);
	});

	it('should return action APP_SET_DATASOURCE', () => {
		const expectedAction = {
			type: types.APP_SET_DATASOURCE,
			datasource: {
				name: 'ds'
			}
		};
		expect(actions.setDatasource({
			name: 'ds'
		})).toEqual(expectedAction);
	});

});

describe('async app actions', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	it('creates APP_LIST_APPS_SUCCESS when fetching apps has been done', () => {
		const payload = {
			body: {
				apps: ['list of items']
			}
		};
		fetchMock.get(appAPIUrl, payload.body);
		const expectedActions = [{
			type: types.APP_LIST_APPS
		},
		{
			type: types.APP_LIST_APPS_SUCCESS,
			apps: payload.body
		}
		];
		const store = mockStore({
			app: {
				id: null
			}
		});

		return store.dispatch(actions.listApps()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('creates APP_GET when fetching apps has been done', () => {
		const payload = {
			body: {
				apps: [{ id: 'appId', name: 'appName' }]
			}
		};
		fetchMock.get(appAPIUrl, payload.body.apps);
		fetchMock.get(appAPIUrl+'appId', 202);
		const store = mockStore({
			app: {
				id: null
			}
		});

		return store.dispatch(actions.listApps()).then(() => {
			expect(store.getActions()).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'APP_GET'
					})
				])
			)
		});
	});

	it('creates APP_LIST_APPS_FAILURE when fetching apps has been failed', () => {
		fetchMock.get(appAPIUrl, 404);
		const expectedActions = [{
			type: types.APP_LIST_APPS
		},
		{
			type: types.APP_LIST_APPS_FAILURE,
			error: 'Not Found'
		}
		];
		const store = mockStore();

		return store.dispatch(actions.listApps()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('creates APP_GET_SUCCESS when fetching app by id has been done', () => {
		const payload = {
			body: {
				name: 'App'
			}
		};
		fetchMock.get(appAPIUrl+'appId', payload.body);
		const expectedActions = [{
			type: types.APP_GET,
			id: 'appId'
		},
		{
			type: types.APP_GET_SUCCESS,
			id: 'appId',
			state: payload.body
		}
		];
		const store = mockStore();

		return store.dispatch(actions.getApp('appId')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('creates APP_GET_FAILURE when fetching app by id has been failed', () => {

		fetchMock.get(appAPIUrl+'appId', 404);
		const expectedActions = [{
			type: types.APP_GET,
			id: 'appId'
		},
		{
			type: types.APP_GET_FAILURE,
			id: 'appId',
			error: 'Not Found'
		}
		];
		const store = mockStore();

		return store.dispatch(actions.getApp('appId')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('creates APP_SAVE_SUCCESS when updating app has been done', () => {
		const payload = {
			body: {
				id: 'appId',
				name: 'App'
			}
		};
		fetchMock.put(appAPIUrl+'appId', payload.body);		
		const expectedActions = [{
			type: types.APP_SAVE,
			id: 'appId'
		},
		{
			type: types.APP_SAVE_SUCCESS,
			app: payload.body
		}
		];
		const store = mockStore();

		return store.dispatch(actions.saveApp(payload.body)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('creates APP_SAVE_FAILURE when updating app has been failed', () => {

		fetchMock.put(appAPIUrl+'appId', 404);
		const expectedActions = [{
			type: types.APP_SAVE,
			id: 'appId'
		},
		{
			type: types.APP_SAVE_FAILURE,
			id: 'appId',
			error: 'Not Found'
		}
		];
		const store = mockStore();

		return store.dispatch(actions.saveApp({
			id: 'appId',
			name: 'App'
		})).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('creates APP_SAVE_SUCCESS and APP_LIST_APPS when saving app has been done', () => {
		const payload = {
			body: {
				name: 'App'
			}
		};
		fetchMock.post(appAPIUrl, payload.body);
		fetchMock.get(appAPIUrl, 202);
		const store = mockStore();

		return store.dispatch(actions.saveApp(payload.body)).then(() => {
			expect(store.getActions()).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'APP_SAVE_SUCCESS'
					})
				])
			);
			expect(store.getActions()).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'APP_LIST_APPS'
					})
				])
			);
		});
	});

	it('creates APP_SAVE_FAILURE when saving app has been failed', () => {
		fetchMock.post(appAPIUrl, 404);
		const store = mockStore();

		return store.dispatch(actions.saveApp({
			name: 'App'
		})).then(() => {
			expect(store.getActions()).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'APP_SAVE_FAILURE'
					})
				])
			);
		});
	});
});