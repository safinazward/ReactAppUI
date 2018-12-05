import {
	reducer,
	dataState
} from '../dataReducer';
import * as dataActionType from '../../actions/dataActionTypes';
import * as appActionTypes from '../../actions/appActionTypes';

describe('Data reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(dataState);
	});

	it('should handle DATA_FETCH', () => {
		expect(reducer({}, {
			type: dataActionType.DATA_FETCH,
			name: 'DS1'
		})).toEqual({
			datasources: {
				DS1: {
					loading: true,
					error: null,
					content: null
				}
			}
		});
	});

	it('should handle DATA_FETCH_SUCCESS', () => {
		expect(reducer({}, {
			type: dataActionType.DATA_FETCH_SUCCESS,
			name: 'DS1',
			result: {
				Data: 'get data result'
			}
		})).toEqual({
			datasources: {
				DS1: {
					loading: false,
					error: null,
					content: {
						Data: 'get data result'
					}
				}
			}
		});
	});

	it('should handle DATA_FETCH_FAILURE', () => {
		expect(reducer({}, {
			type: dataActionType.DATA_FETCH_FAILURE,
			name: 'DS1',
			error: 'error while fetching data'
		})).toEqual({
			datasources: {
				DS1: {
					loading: false,
					error: 'error while fetching data',
					content: null
				}
			}
		});
	});

	it('should handle APP_REMOVE_DATASOURCE', () => {
		expect(reducer({
			datasources: {
				DS1: {
					name: 'DS1'
				},
				DS2: {
					name: 'DS2'
				}
			}
		}, {
			type: appActionTypes.APP_REMOVE_DATASOURCE,
			name: 'DS1'
		})).toEqual({
			datasources: {
				DS2: {
					name: 'DS2'
				}
			}
		});
	});

});