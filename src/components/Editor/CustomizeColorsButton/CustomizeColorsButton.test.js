import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { CustomizeColorsButton } from './CustomizeColorsButton';
import thunk from 'redux-thunk';
import CustomizeColorsButtonContainer from './CustomizeColorsButton';
import ColorSwitcher from '../ColorSwitcher';


describe('Customize colors button', () => {
	it('should display two color switcher', () => {
		const wrapper = mount(< CustomizeColorsButton />);
		expect(wrapper.find(ColorSwitcher).length).toEqual(2);
	});

	it('should set custom color when the color changed', () => {
		const mockStore = configureStore([thunk]);
		const store = mockStore({ app: { customColors: [] } });
		const wrapper = shallow(< CustomizeColorsButtonContainer store={store} />);
		wrapper.props().handleColorChange('--theme-primary-color', '#666');
		const actions = store.getActions();
		expect(actions).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: 'APP_SET_CUSTOM_COLOR'
				})
			])
		)
	});
});

