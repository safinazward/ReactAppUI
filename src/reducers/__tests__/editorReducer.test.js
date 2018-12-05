import { reducer, editorState } from '../editorReducer';
import * as editorActionTypes from '../../actions/editorActionTypes';
import * as appActionTypes from '../../actions/appActionTypes';

describe('Editor reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(editorState);
	});

	it('should handle EDITOR_TOGGLE_EDIT_MODE', () => {
		expect(
			reducer(
				{
					editing: false
				},
				{
					type: editorActionTypes.EDITOR_TOGGLE_EDIT_MODE
				}
			)
		).toEqual({
			editing: true,
			editorComponent: null,
			selectedElementId: null
		});
	});

	it('should handle EDITOR_TOGGLE_OVERLAY_MODE', () => {
		expect(
			reducer(
				{
					overlay: false
				},
				{
					type: editorActionTypes.EDITOR_TOGGLE_OVERLAY_MODE
				}
			)
		).toEqual({
			overlay: true
		});
	});

	it('should handle EDITOR_SET_SELECTED_TARGET', () => {
		expect(
			reducer(
				{},
				{
					type: editorActionTypes.EDITOR_SET_SELECTED_TARGET,
					elementId: 'root',
					editorComponent: 'PlaceholderEditor'
				}
			)
		).toEqual({
			editing: true,
			selectedElementId: 'root',
			editorComponent: 'PlaceholderEditor'
		});
	});

	it('should handle EDITOR_SET_SELECTED_EDITOR_COMPONENT', () => {
		expect(
			reducer(
				{},
				{
					type: editorActionTypes.EDITOR_SET_SELECTED_EDITOR_COMPONENT,
					editorComponent: 'PlaceholderEditor'
				}
			)
		).toEqual({
			editorComponent: 'PlaceholderEditor'
		});
	});

	it('should handle APP_LIST_APPS_SUCCESS', () => {
		expect(
			reducer(
				{},
				{
					type: appActionTypes.APP_LIST_APPS_SUCCESS,
					apps: {
						app1: {
							name: 'FirstApp'
						},
						app2: {
							name: 'SecondApp'
						}
					}
				}
			)
		).toEqual({
			apps: {
				app1: {
					name: 'FirstApp'
				},
				app2: {
					name: 'SecondApp'
				}
			}
		});
	});

	it('should handle APP_GET_SUCCESS', () => {
		expect(
			reducer(
				{},
				{
					type: appActionTypes.APP_GET_SUCCESS
				}
			)
		).toEqual({
			editorComponent: null,
			selectedElementId: null
		});
	});

	it('should handle APP_SAVE_SUCCESS', () => {
		expect(
			reducer(
				{},
				{
					type: appActionTypes.APP_SAVE_SUCCESS
				}
			)
		).toEqual({
			editing: true
		});
	});

	it('should handle APP_REMOVE_SUCCESS', () => {
		expect(reducer({
			apps: [{
				id: 'app1',
				name: 'Sweet Portal'
			},
			{
				id: 'App2',
				name: 'Case management'
			}]
		}, {
			type: appActionTypes.APP_REMOVE_SUCCESS,
			id: 'App2'
		})).toEqual({
			apps: [{
				id: 'app1',
				name: 'Sweet Portal'
			}]
		});
	});
});
