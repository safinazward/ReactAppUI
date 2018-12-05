import * as editorActionTypes from './../actions/editorActionTypes';
import * as appActionTypes from './../actions/appActionTypes';

export const editorState = {
	editing: false,
	overlay: true,
	panelWidth: '250px',
	apps: null
};

export const reducer = (
	state = {
		...editorState
	},
	action
) => {
	switch (action.type) {
		case editorActionTypes.EDITOR_TOGGLE_EDIT_MODE:
			return {
				...state,
				editing: !state.editing,
				selectedElementId: null,
				editorComponent: null
			};

		case editorActionTypes.EDITOR_TOGGLE_OVERLAY_MODE:
			return {
				...state,
				overlay: !state.overlay
			};

		case editorActionTypes.EDITOR_SET_SELECTED_TARGET:
			return {
				...state,
				selectedElementId: action.elementId,
				editorComponent: action.editorComponent,
				editing: true
			};

		case editorActionTypes.EDITOR_SET_SELECTED_EDITOR_COMPONENT:
			return {
				...state,
				editorComponent: action.editorComponent
			};

		case appActionTypes.APP_LIST_APPS_SUCCESS:
			return {
				...state,
				apps: action.apps
			};

		case appActionTypes.APP_GET_SUCCESS:
			return {
				...state,
				selectedElementId: null,
				editorComponent: null
			};

		case appActionTypes.APP_SAVE_SUCCESS:
			return {
				...state,
				editing: true
			};

		case appActionTypes.APP_REMOVE_SUCCESS:
			return {
				...state,
				apps: state.apps.filter(obj => {
					return obj.id !== action.id;
				}),
			};

		default:
			return state;
	}
};

export default reducer;
