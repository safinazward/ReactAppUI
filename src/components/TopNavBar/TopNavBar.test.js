import React from 'react';
import TopNavBar from './TopNavBar';
import {
	shallow
} from 'enzyme';
import { IntlProvider } from 'react-intl';

describe('The top navbar', () => {
	it('renders without crashing', () => {
		shallow(
			<IntlProvider locale="en">
				<TopNavBar />
			</IntlProvider>
		);
	});
});