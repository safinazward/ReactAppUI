import React from 'react';
import { SwTable } from './SwTable';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

describe('<SwTable/>', () => {

	it('renders without crashing', () => {
		shallow(
			<SwTable />
		);
	});

	it('renders message when no datasource is choosen', () => {

		let table = shallow(
			<SwTable />
		);

		expect(table.find(FormattedMessage).length).toEqual(1);
	});

	it('renders content from datasource', () => {

		let datasources = {
			ds1: {}
		};

		let datasourceContents = {
			ds1: {
				content: [
					{ name: 'row1', value: 1 },
					{ name: 'row2', value: 2 },
					{ name: 'row3', value: 3 }
				]
			}
		};

		let table = shallow(
			<SwTable
				selectedDatasource='ds1'
				datasources={datasources}
				datasourceContents={datasourceContents}
			/>
		);

		//has one table
		expect(table.find('table').length).toEqual(1);

		//with 1 header and 3 rows
		expect(table.find('table').first().find('tr').length).toEqual(4);

		//with a header with 2 cols
		expect(table.find('table').first().find('tr').first().find('th').length).toEqual(2);
	});

});