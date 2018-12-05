import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { AddDatasourceButton } from './AddDatasourceButton';
import thunk from 'redux-thunk';
import AddDatasourceButtonContainer from './AddDatasourceButton';
import { initialState } from './AddDatasourceButton';

describe('Add datasource button', () => {

	it('should response to change event and change its state', () => {
		const wrapper = shallow(< AddDatasourceButton datasources={{}} />);
		wrapper.find('#name').simulate('change', { target: { id: 'name', value: 'datasource name' } });
		expect(wrapper.state('name')).toEqual('datasource name');
	});

	it('should reset its state after saving the datasoruce', () => {
		const mockAddDSfn = jest.fn();
		const wrapper = shallow(< AddDatasourceButton datasources={{}} addDatasource={mockAddDSfn} />);
		wrapper.find('#saveBtn').simulate('click');
		expect(wrapper.state()).toEqual(initialState);
	});

	it('should remove datasource', () => {
		const mockRemoveDSfn = jest.fn();
		const wrapper = shallow(< AddDatasourceButton datasources={{ds1: { name: 'ds1' }, ds2: { name: 'ds2' }}} removeDatasource={mockRemoveDSfn} />);
		wrapper.find('#ds1').simulate('click');
		expect(mockRemoveDSfn).toHaveBeenCalled();
	});

	it('should add the datasource when the save button clicked', () => {
		const mockStore = configureStore([thunk]);
		const store = mockStore({ app: { datasources: {} } });
		const wrapper = shallow(< AddDatasourceButtonContainer store={store} />);
		wrapper.props().addDatasource('name', 'url', 'token');
		const actions = store.getActions();
		expect(actions).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: 'APP_ADD_DATASOURCE'
				})
			])
		)
	});

	it('should remove the datasource when the delete button clicked', () => {
		const mockStore = configureStore([thunk]);
		const store = mockStore({ app: { datasources: {ds1: { name: 'ds1' }, ds2: { name: 'ds2' }} } });
		const wrapper = shallow(< AddDatasourceButtonContainer store={store} />);
		wrapper.props().removeDatasource('ds1');
		const actions = store.getActions();
		expect(actions).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: 'APP_REMOVE_DATASOURCE'
				})
			])
		)
	});
});

