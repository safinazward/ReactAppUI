import * as dataActionType from './../actions/dataActionTypes';
import * as appActionTypes from './../actions/appActionTypes';


export const dataState = {
	datasources: {}
};

export const reducer = (state = {
	...dataState
}, action) => {
	let ds = {};
	switch (action.type) {
	case dataActionType.DATA_FETCH:
		ds = {
			...state.datasources
		};
		ds[action.name] = {
			loading: true,
			error: null,
			content: null
		};
		return {
			...state,
			datasources: ds
		};

	case dataActionType.DATA_FETCH_SUCCESS:
		ds = {
			...state.datasources
		};
		ds[action.name] = {
			loading: false,
			error: null,
			content: action.result
		};
		return {
			...state,
			datasources: ds
		};

	case dataActionType.DATA_FETCH_FAILURE:
		ds = {
			...state.datasources
		};
		ds[action.name] = {
			loading: false,
			error: action.error,
			content: null
		};
		return {
			...state,
			datasources: ds
		};

	case appActionTypes.APP_REMOVE_DATASOURCE:
		const oldDS = {
			...state.datasources
		};
		let key = action.name;
		const {
			[key]: _, ...newDS
		} = oldDS;
		return {
			...state,
			datasources: newDS
		};

	default:
		return state;
	}
};

export default reducer;