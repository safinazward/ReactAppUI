import * as types from './appActionTypes';
import AppService from '../services/appService';

export const listApps = () => (dispatch, getState) => {
	dispatch({
		type: types.APP_LIST_APPS
	});
	return AppService.listApps().then((apps) => {
		dispatch({
			type: types.APP_LIST_APPS_SUCCESS,
			apps
		});
		if (getState().app.id === null && apps.length > 0) {
			dispatch(getApp(apps[0].id));
		}
	})
		.catch(error => dispatch({
			type: types.APP_LIST_APPS_FAILURE,
			error: error.message
		}));
};

export const saveApp = (app) => dispatch => {
	dispatch({
		type: types.APP_SAVE,
		id: app.id
	});

	let appData = JSON.stringify({
		name: app.name,
		state: JSON.stringify(app)
	});

	if (app.id) {
		return AppService.createOrUpdateApp(app.id, appData)
			.then((app) => dispatch({
				type: types.APP_SAVE_SUCCESS,
				app: app
			}))
			.catch(error => dispatch({
				type: types.APP_SAVE_FAILURE,
				id: app.id,
				error: error.message
			}));
	} else {
		return AppService.createOrUpdateApp(app.id, appData)
			.then((app) => {
				dispatch({
					type: types.APP_SAVE_SUCCESS,
					app: app
				});
				dispatch(listApps());
			}).catch(error => dispatch({
				type: types.APP_SAVE_FAILURE,
				id: app.id,
				error: error.message
			}));
	}
};

export const getApp = (id) => dispatch => {
	dispatch({
		type: types.APP_GET,
		id
	});

	return AppService.getApp(id)
		.then((state) => dispatch({
			type: types.APP_GET_SUCCESS,
			id: id,
			state: state
		}))
		.catch(error => dispatch({
			type: types.APP_GET_FAILURE,
			id: id,
			error: error.message
		}));
};

export const setElementState = (id, changes) => {
	return {
		type: types.APP_SET_ELEMENT_STATE,
		id,
		changes
	};
};

export const removeElementState = (id) => {
	return {
		type: types.APP_REMOVE_ELEMENT_STATE,
		id
	};
};

export const setCustomColor = (id, customColor) => {
	return {
		type: types.APP_SET_CUSTOM_COLOR,
		id,
		customColor
	};
};

export const addDatasource = (name, url, token) => {
	return {
		type: types.APP_ADD_DATASOURCE,
		name,
		url,
		token
	};
};

export const removeDatasource = (name) => {
	return {
		type: types.APP_REMOVE_DATASOURCE,
		name
	};
};

export const setDatasource = (datasource) => {
	return {
		type: types.APP_SET_DATASOURCE,
		datasource
	};
};
