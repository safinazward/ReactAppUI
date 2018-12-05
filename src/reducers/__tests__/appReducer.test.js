import {
	reducer,
	appState
} from '../appReducer';
import * as types from '../../actions/appActionTypes';

describe('App reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(appState);
	});

	it('should handle APP_GET_SUCCESS', () => {
		expect(reducer({}, {
			type: types.APP_GET_SUCCESS,
			id: 'uniqueID',
			state: JSON.stringify({
				name: 'app1'
			})
		})).toEqual({
			id: 'uniqueID',
			name: 'app1'
		});
	});

	it('should handle APP_SET_ELEMENT_STATE', () => {
		expect(reducer({}, {
			type: types.APP_SET_ELEMENT_STATE,
			id: 'id1',
			elementState: {
				name: 'el1'
			}
		})).toEqual({ 
			elements: {
				id1: {}
			}
		});
	});

	it('should handle APP_REMOVE_ELEMENT_STATE', () => {
		const currentState = {
			elements: {
				id1: {
					name: 'el1'
				},
				id2: {
					name: 'el2'
				}
			}
		};
		expect(reducer(currentState, {
			type: types.APP_REMOVE_ELEMENT_STATE,
			id: 'id1'
		})).toEqual({
			elements: {
				id2: {
					name: 'el2'
				}
			}
		});
	});

	it('should handle APP_SET_CUSTOM_COLOR', () => {
		expect(reducer({}, {
			type: types.APP_SET_CUSTOM_COLOR,
			id: 'id1',
			customColor: '#000'
		})).toEqual({
			customColors: {
				id1: '#000'
			}
		});
	});

	it('should handle APP_SAVE_SUCCESS', () => {
		expect(reducer({}, {
			type: types.APP_SAVE_SUCCESS,
			app: {
				id: 'id1',
				state: JSON.stringify({
					name: 'App1'
				})
			}
		})).toEqual({
			id: 'id1',
			name: 'App1'
		});
	});

	it('should handle APP_ADD_DATASOURCE', () => {
		expect(reducer({}, {
			type: types.APP_ADD_DATASOURCE,
			name: 'ds1',
			url: 'APIUrl',
			token: 'token1'
		})).toEqual({
			datasources: {
				ds1: {
					name: 'ds1',
					url: 'APIUrl',
					token: 'token1'
				}
			}
		});
	});

	it('should handle APP_SET_DATASOURCE', () => {
		expect(reducer({}, {
			type: types.APP_SET_DATASOURCE,
			datasource: {
				name: 'ds1',
				url: 'APIUrl',
				token: 'token1'
			}
		})).toEqual({
			datasources: {
				ds1: {
					name: 'ds1',
					url: 'APIUrl',
					token: 'token1'
				}
			}
		});
	});

	it('should handle APP_REMOVE_DATASOURCE', () => {
		expect(reducer({
			datasources: {
				ds1: {},
				ds2: {}
			}
		}, {
			type: types.APP_REMOVE_DATASOURCE,
			name: 'ds1'
		})).toEqual({
			datasources: {
				ds2: {}
			}
		});
	});
});