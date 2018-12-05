import React from 'react';
import { shallow } from 'enzyme';
import ConnectedRemoveAppButton, { RemoveAppButton } from './RemoveAppButton';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('<RemoveAppButton />', () => {
	const props = {
		editor: { editing: true },
		id: 'app1',
		removeApp: jest.fn()
	};

	it('Renders connected component without crashing', () => {
		let initialState = {
			editor: {
				editing: true
			},
			app: { id: 'app1' }
		};

		let mockStore = configureStore();
		let store = mockStore(initialState);

		let wrapper = shallow(<ConnectedRemoveAppButton store={store} />);
		let component = wrapper.dive();
		expect(component.find('button').length).toBe(1);
	});

	it('should trigger remove function', () => {
		let wrapper = shallow(<RemoveAppButton {...props} />);
		let button = wrapper.find('button');
		button.simulate('click');
		expect(props.removeApp).toHaveBeenCalled();
	});

	it('should dispatch remove app when the button is clicked', () => {
		const mockStore = configureStore([thunk]);
		const store = mockStore({ app: { id: 'app1', name: 'App' } });
		const wrapper = shallow(< ConnectedRemoveAppButton store={store} />);
		wrapper.props().removeApp('app1');
		const actions = store.getActions();
		expect(actions).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: 'APP_REMOVE'
				})
			])
		)
	});
});