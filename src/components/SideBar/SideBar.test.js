import React from 'react';
import SideBar from './SideBar';
import {
	shallow
} from 'enzyme';

describe('The sidebar', () => {
	it('renders without crashing', () => {
		shallow(< SideBar />);
	});
});