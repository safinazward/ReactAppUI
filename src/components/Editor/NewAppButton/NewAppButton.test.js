import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { NewAppButton } from './NewAppButton';
import thunk from 'redux-thunk';
import NewAppButtonContainer from './NewAppButton';


describe('New app button', () => {
	it('should call the mock creat new app function', () => {
		const mockCreateNewAppfn = jest.fn();
		const wrapper = mount(< NewAppButton createNewApp={mockCreateNewAppfn} />);
		wrapper.setState({ name: 'App1' });
		wrapper.find('#createAppBtn').simulate('click');
		expect(mockCreateNewAppfn).toHaveBeenCalled();
	});

	it('should response to change event and change its state', () => {
		const wrapper = shallow(< NewAppButton />);
		wrapper.find('#name').simulate('change', { target: { id: 'name', value: 'new app name' } });
		expect(wrapper.state('name')).toEqual('new app name');
	});

	it('should save new app when the button is clicked', () => {
		const mockStore = configureStore([thunk]);
		const store = mockStore({});
		const wrapper = shallow(< NewAppButtonContainer store={store} />);
		wrapper.props().createNewApp({ name: 'App1' });
		const actions = store.getActions();
		expect(actions).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: 'APP_SAVE'
				})
			])
		)
	});
});

