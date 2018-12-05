import * as types from './editorActionTypes';
import * as appTypes from './appActionTypes';
import { listApps } from './appActions';
import AppService from '../services/appService';

export const toggleEditMode = () => {
	return {
		type: types.EDITOR_TOGGLE_EDIT_MODE
	};
};

export const toggleOverlayMode = () => {
	return {
		type: types.EDITOR_TOGGLE_OVERLAY_MODE
	};
};

export const setEditorPanelTarget = (elementId) => {
	return {
		type: types.EDITOR_SET_SELECTED_TARGET,
		elementId
	};
};

export const setEditorPanelEditorComponent = (editorComponent) => {
	return {
		type: types.EDITOR_SET_SELECTED_EDITOR_COMPONENT,
		editorComponent
	};
};

export const removeApp = (id) => (dispatch) => {
	dispatch({
		type: appTypes.APP_REMOVE
	});

	return AppService.deleteApp(id)
		.then(() => {
			dispatch({
				type: appTypes.APP_REMOVE_SUCCESS,
				id: id,
			});
			dispatch(listApps());
		}).catch(error => dispatch({
			type: appTypes.APP_REMOVE_FAILURE,
			id: id,
			error: error.message
		}));
};

