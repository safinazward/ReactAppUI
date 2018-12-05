import reducer from '../rootReducer';
import { appState } from '../appReducer';
import { editorState } from '../editorReducer';
import { dataState } from '../dataReducer';
import { userSettingsState } from '../userSettingsReducer';


describe('root reducer', () => {
	it('should combine all reducers', () => {
		expect(reducer({}, {
			type: '@@INIT'
		})).toEqual({
			app: appState,
			editor: editorState,
			data: dataState,
			userSettings: userSettingsState
		});
	});

});