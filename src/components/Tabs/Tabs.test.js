import React from 'react';
import Tabs from './Tabs';
import {
	shallow
} from 'enzyme';

describe('The tabs', () => {
	it('renders without crashing', () => {
		shallow(< Tabs />);
	});
});