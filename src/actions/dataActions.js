import * as types from './dataActionTypes';
import { handleErrors } from '../utils/errorHandling';

export const fetchBegin = name => ({
	type: types.DATA_FETCH,
	name: name
});

export const fetchSuccess = (datasource, result) => {

	if (datasource.filter) {
		if (datasource.filter.rows !== 'all') {
			let rows = parseInt(datasource.filter.rows, 10);
			result = result.slice(0, rows);
		}
	}

	return {
		type: types.DATA_FETCH_SUCCESS,
		name: datasource.name,
		result: result
	};
};

export const fetchSuccessSA = (datasource, result) => {

	let content = result.Rows.map((row) => {
		let r = {};
		result.Columns.forEach((c, i) => {
			r[c.Name] = row[i];
		});
		return r;
	});

	if (datasource.filter) {
		if (datasource.filter.rows !== 'all') {
			let rows = parseInt(datasource.filter.rows, 10);
			content = content.slice(0, rows);
		}
	}

	return {
		type: types.DATA_FETCH_SUCCESS,
		name: datasource.name,
		result: content
	};
};

export const fetchFailure = (name, error) => ({
	type: types.DATA_FETCH_FAILURE,
	name: name,
	error: error
});

export const fetchItems = (datasourceId) => (dispatch, getState) => {
	dispatch(fetchBegin(datasourceId));

	let datasource = getState().app.datasources[datasourceId];
	let header;

	if (datasource.token) {
		header = {
			method: 'GET',
			headers: new Headers({
				ApiKey: datasource.token,
				Accept: 'application/json'
			})
		};
	}

	return fetch(datasource.url, header)
		.then(handleErrors)
		.then(res => res.json())
		.then(json => {

			if (datasource.token) {
				dispatch(fetchSuccessSA(datasource, json));
			} else {
				dispatch(fetchSuccess(datasource, json));
			}
		})
		.catch(error => dispatch(fetchFailure(datasourceId, 'Request failed: ' + error)));
};

