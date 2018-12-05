import React from 'react';
import { SwFilter as SwFilterComponent } from './SwFilter';
import SwFilter from './SwFilter';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

describe('<Filter />', () => {

	it('renders Filter without crashing', () => {

		let state = {
			editor: {
				editing: true
			},
			app: {
				datasources: {},
				elements: {}
			},
			data: {
				datasources: {}
			}
		};

		const store = configureStore()(state);

		global.shallowWithIntl(
			<SwFilter store={store} />
		);

	});

	it('it shows the filter options when a datasource is selected', () => {

		let state = {
			editor: {
				editing: true
			},
			app: {
				datasources: {
					ds1: { name: 'ds1', filter: {} }
				},
				elements: {
					filter: { datasource: 'ds1' }
				}
			},
			data: {
				datasources: {
					ds1: { loading: false, content: [] }
				}
			}
		};

		const store = configureStore()(state);

		let filter = global.mountWithIntl(
			<SwFilter id="filter" store={store} />
		);

		expect(filter.find('#refreshBtn').length).toEqual(1);
		expect(filter.find('#rowOptions').length).toEqual(1);
	});

	it('dispatches fetchItems when reload button is clicked', () => {

		let mockFetchItems = jest.fn();

		let filter = shallow(
			<SwFilterComponent
				id="filter"
				fetchItems={mockFetchItems}
				selectedDatasource='ds1'
				datasources={{ ds1: { name: 'ds1', filter: {} } }}
			/>
		);

		let refreshButton = filter.find('#refreshBtn');
		refreshButton.simulate('click');

		//should have called fetch items once
		expect(mockFetchItems.mock.calls.length).toBe(1);

		//should have called fetch items for datasource 'ds1'
		expect(mockFetchItems.mock.calls[0][0]).toBe('ds1');
	});

	it('saves filter settings and fetchItems when rows filter changes', () => {

		let mockFetchItems = jest.fn();
		let mockSetDatasource = jest.fn();

		let filter = shallow(
			<SwFilterComponent
				id="filter"
				fetchItems={mockFetchItems}
				setDatasource={mockSetDatasource}
				selectedDatasource='ds1'
				datasources={{ ds1: {} }}
			/>
		);

		let rowOptions = filter.find('#rowOptions');
		rowOptions.simulate('change', { target: { value: '10' } });

		//should have called setDatasource
		expect(mockSetDatasource.mock.calls.length).toBe(1);

		//should have called setDatasource with filter rows=10
		expect(mockSetDatasource.mock.calls[0][0].filter.rows).toBe('10');

		//should have called fetch items once
		expect(mockFetchItems.mock.calls.length).toBe(1);

		//should have called fetch items for datasource 'ds1'
		expect(mockFetchItems.mock.calls[0][0]).toBe('ds1');
	});

});