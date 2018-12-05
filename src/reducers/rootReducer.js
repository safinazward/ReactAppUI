import { combineReducers } from 'redux';
import editor from './editorReducer';
import app from './appReducer';
import data from './dataReducer';
import userSettings from './userSettingsReducer';

export default combineReducers({
	app,
	editor,
	data,
	userSettings
});
