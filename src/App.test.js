import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { FormattedMessage } from 'react-intl';

import TranslationService from './services/translationService'


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<App />', () => {
	
	let wrapper, store;
	
	it('map state to props', () => {
		const initialState = {
			app: {
				id: 'app1',
				name: 'FirstApp'
			},
			editor: {
				editing: false,
				overlay: false,
				apps: [{ id: 'app1', name: 'FirstApp' }, { id: 'app2', name: 'app2' }]
			}
		};
		store = mockStore(initialState);
		wrapper = shallow(<App store={store} />);
		expect(wrapper.props().editing).toEqual(false);
		expect(wrapper.props().editorPanelOverlay).toEqual(false);
		expect(wrapper.props().app).toEqual({ id: 'app1', name: 'FirstApp' });
		expect(wrapper.props().apps).toEqual([{ id: 'app1', name: 'FirstApp' }, { id: 'app2', name: 'app2' }]);
	});

	/*it('loads locales', () => {
		const initialState = {
			app: {
				id: 'app1',
				name: 'FirstApp'
			},
			editor: {
				editing: false,
				overlay: false,
				apps: [{ id: 'app1', name: 'FirstApp' }, { id: 'app2', name: 'app2' }]
			},
			userSettings: {}
		};
		TranslationService.getLocales = jest.fn().mockReturnValue(Promise.resolve([{code:'sv'},{code:'en'}]));
		store = mockStore(initialState);
		wrapper = shallow(<App store={store} />);	
		expect(TranslationService.getLocales).toHaveBeenCalled();
		expect(wrapper.state('locales').toEqual([{code:'sv'},{code:'en'}]));
		expect(wrapper.language).toEqual('ty');
		
		//  setTimeout(()=> {
		//  	expect(TranslationService.getLocales).toHaveBeenCalled();
		//  	expect(wrapper.state('locales').toEqual([{code:'sv'},{code:'en'}]));
		//  	expect(wrapper.language).toEqual('ty');
		//  	},1000);		
	});*/



	it('renders the loading page while we are fetching apps', () => {
		const stateWithoutApps = {
			app: {
				id: 'app1',
				name: 'FirstApp'
			},
			editor: {
				editing: false,
				overlay: false,
				apps: null
			},
			userSettings: {
			}
		};
		store = mockStore(stateWithoutApps);
		wrapper = shallow(<App store={store} />);
		expect(wrapper.dive().find('span').hasClass('fa')).toBe(true);
	});

	it('renders the selected app', () => {
		const stateWithoutApps = {
			app: {
				id: 'app1',
				name: 'FirstApp'
			},
			editor: {
				editing: false,
				overlay: false,
				apps: [{ id: 'app1', name: 'FirstApp' }, { id: 'app2', name: 'app2' }]
			},
			userSettings: {
				translations: { 'welcome': 'Welcome!' }
			}
		};
		store = mockStore(stateWithoutApps);
		wrapper = shallow(<App store={store} />);
		expect(wrapper.dive().find('#root').length).toEqual(1);
	});

	it('renders FormattedMessage', () => {
		const stateWithoutApps = {
			app: {
				id: null
			},
			editor: {
				editing: false,
				overlay: false,
				apps: []
			},
			userSettings: {
				translations: { 'app.welcome': 'Welcome!' }
			}
		};
		store = mockStore(stateWithoutApps);
		wrapper = shallow(<App store={store} />);

		expect(wrapper.dive().find(FormattedMessage).length).toEqual(2);
	});

	it('renders the loading page when we have list of apps and there is no app selected', () => {
		const stateWithoutApps = {
			app: {
				id: null
			},
			editor: {
				editing: false,
				overlay: false,
				apps: [{ id: 'app1' }]
			},
			userSettings: {
				translations: {}
			}
		};
		store = mockStore(stateWithoutApps);
		wrapper = shallow(<App store={store} />);

		expect(wrapper.dive().find('span').hasClass('fa')).toBe(true);
	});

	it('should disable editor panel overlay', () => {
		const stateWithoutApps = {
			app: {
				id: 'app1',
				name: 'FirstApp'
			},
			editor: {
				editing: true,
				overlay: false,
				apps: [{ id: 'app1', name: 'FirstApp' }, { id: 'app2', name: 'app2' }]
			},
			userSettings: {
				translations: {}
			}
		};
		store = mockStore(stateWithoutApps);
		wrapper = shallow(<App store={store} />);
		expect(wrapper.dive().find('.editing').props().style).toEqual({ marginRight: '250px' });
	});
});

