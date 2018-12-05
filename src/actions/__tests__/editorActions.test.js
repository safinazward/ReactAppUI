import * as actions from '../editorActions';
import * as types from '../editorActionTypes';
import * as appTypes from '../appActionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchMock } from 'fetch-mock';

import {appAPIUrl} from '../../services/appService';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('editor actions', () => {
	it('should return action EDITOR_TOGGLE_EDIT_MODE', () => {
		const expectedAction = {
			type: types.EDITOR_TOGGLE_EDIT_MODE
		};
		expect(actions.toggleEditMode()).toEqual(expectedAction);
	});

	it('should return action EDITOR_TOGGLE_OVERLAY_MODE', () => {
		const expectedAction = {
			type: types.EDITOR_TOGGLE_OVERLAY_MODE
		};
		expect(actions.toggleOverlayMode()).toEqual(expectedAction);
	});

	it('should return action EDITOR_SET_SELECTED_TARGET', () => {
		const expectedAction = {
			type: types.EDITOR_SET_SELECTED_TARGET,
			elementId: 'el1'
		};
		expect(actions.setEditorPanelTarget('el1')).toEqual(expectedAction);
	});

	it('should return action EDITOR_SET_SELECTED_EDITOR_COMPONENT', () => {
		const expectedAction = {
			type: types.EDITOR_SET_SELECTED_EDITOR_COMPONENT,
			editorComponent: '/pathtoeditorComponent'
		};
		expect(actions.setEditorPanelEditorComponent('/pathtoeditorComponent')).toEqual(expectedAction);
	});

});

describe('async editor actions', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	it('creates APP_REMOVE_SUCCESS when removing app by id has been done', () => {
		let id = 'AppId';
		fetchMock.delete(appAPIUrl + id, 202);
		fetchMock.get(appAPIUrl,202);

		const store = mockStore();

		return store.dispatch(actions.removeApp('AppId')).then(() => {
			expect(store.getActions()).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: appTypes.APP_REMOVE_SUCCESS
					})
				])
			)
		});
	});

	it('creates APP_REMOVE_FAILURE when removing app by id has been failed', () => {
		let id = 'AppId';
		fetchMock.delete(appAPIUrl + id, 404);
		const store = mockStore();

		return store.dispatch(actions.removeApp('AppId')).then(() => {
			expect(store.getActions()).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: appTypes.APP_REMOVE_FAILURE
					})
				])
			)
		});
	});
});

