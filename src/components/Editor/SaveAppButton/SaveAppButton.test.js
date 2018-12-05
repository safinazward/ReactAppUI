import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { SaveAppButton } from './SaveAppButton';
import thunk from 'redux-thunk';
import SaveAppButtonContainer from './SaveAppButton';


describe('Save app button', () => {
	it('should display save button', () => {
		const wrapper = shallow(< SaveAppButton />);
		expect(wrapper.find('button').length).toEqual(1);
		expect(wrapper.find('button').children().hasClass('fa-save')).toBe(true);
	});

	it('should save the app when the button is clicked', () => {
		const mockStore = configureStore([thunk]);
		const store = mockStore({ app: { id: 'app1', name: 'App' } });
		const wrapper = shallow(< SaveAppButtonContainer store={store} />);
		wrapper.props().save(wrapper.props().app);
		const actions = store.getActions();
		expect(actions).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: 'APP_SAVE'
				})
			])
		)
	});

	it('should trigger save func when the button is clicked', () => {
		const mockSave = jest.fn();
		const app = { id: 'appId' };
		const wrapper = shallow(< SaveAppButton save={mockSave} app={app} />);
		wrapper.find('button').simulate('click');
		expect(mockSave.mock.calls.length).toBe(1);
		expect(mockSave.mock.calls[0][0]).toBe(app);
	});
});

