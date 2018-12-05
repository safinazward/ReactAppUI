import * as actions from '../dataActions';
import * as types from '../dataActionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async data actions', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	it('creates DATA_FETCH_SUCCESS when fetching data has been done', () => {
		const initialState = {
			app: {
				datasources: {
					ds1: {
						url: '/api',
						name: 'ds1'
					}
				}
			}
		};

		const payload = {
			body: {
				items: ['list of items']
			}
		};

		fetchMock.mock('/api', payload.body);
		const expectedActions = [{
			type: types.DATA_FETCH,
			name: 'ds1'
		},
		{
			type: types.DATA_FETCH_SUCCESS,
			name: 'ds1',
			result: payload.body
		}
		];
		const store = mockStore(initialState);
		return store.dispatch(actions.fetchItems('ds1')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('creates DATA_FETCH_FAILURE when fetching data has been failed', () => {
		const initialState = {
			app: {
				datasources: {
					ds1: {
						url: '/api',
						name: 'ds1'
					}
				}
			}
		};

		fetchMock.mock('/api', () => {
			throw Error('error message');
		});

		const expectedActions = [{
			type: types.DATA_FETCH,
			name: 'ds1'
		},
		{
			type: types.DATA_FETCH_FAILURE,
			name: 'ds1',
			error: 'Request failed: Error: error message'
		}
		];

		const store = mockStore(initialState);

		return store.dispatch(actions.fetchItems('ds1')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

});