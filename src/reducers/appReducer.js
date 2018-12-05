import * as appActionTypes from './../actions/appActionTypes';

export const appState = {
	id: null,
	name: '',
	elements: {},
	customColors: {},
	datasources: {}
};

export const reducer = (state = {
	...appState
}, action) => {
	switch (action.type) {
		case appActionTypes.APP_GET_SUCCESS:
			return {
				...JSON.parse(action.state),
				id: action.id
			};

		case appActionTypes.APP_SET_ELEMENT_STATE:
			let newSetState = {
				...state,
				elements: {
					...state.elements
				}
			};

			let currentElementState = newSetState.elements[action.id] || {};

			newSetState.elements[action.id] = {
				...currentElementState,
				...action.changes
			};

			return newSetState;

		case appActionTypes.APP_REMOVE_ELEMENT_STATE:
			let newRemoveState = {
				...state,
				elements: {}
			};

			//remove the element and all its childs
			for (const key in state.elements) {
				if (!key.startsWith(action.id)) {
					newRemoveState.elements[key] = {
						...state.elements[key]
					};
				}
			}
			return newRemoveState;

		case appActionTypes.APP_SET_CUSTOM_COLOR:
			let newSetCustomColorState = {
				...state,
				customColors: {
					...state.customColors
				}
			};
			newSetCustomColorState.customColors[action.id] = action.customColor;
			return newSetCustomColorState;

		case appActionTypes.APP_SAVE_SUCCESS:
			return {
				...JSON.parse(action.app.state),
				id: action.app.id
			};

		case appActionTypes.APP_ADD_DATASOURCE:
			let newAddDsState = {
				...state,
				datasources: {
					...state.datasources
				}
			};
			newAddDsState.datasources[action.name] = {
				name: action.name,
				url: action.url,
				token: action.token
			};
			return newAddDsState;

		case appActionTypes.APP_SET_DATASOURCE:
			let newSetDsState = {
				...state,
				datasources: {
					...state.datasources
				}
			};
			newSetDsState.datasources[action.datasource.name] = {
				...action.datasource
			};
			return newSetDsState;

		case appActionTypes.APP_REMOVE_DATASOURCE:
			let newRemoveDsState = {
				...state,
				datasources: {
					...state.datasources
				}
			};
			delete newRemoveDsState.datasources[action.name];
			return newRemoveDsState;

		// TODO: fix state handling 
		// case appActionTypes.APP_REMOVE_SUCCESS:
		//   let newRemoveAppState = {
		//     ...appState
		//   };
		//   return newRemoveAppState;

		default:
			return state;
	}
};

export default reducer;