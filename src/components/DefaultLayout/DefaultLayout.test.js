import React from 'react';
import DefaultLayout from './DefaultLayout';
import {
	shallow
} from 'enzyme';

describe('The default layout', () => {
	it('renders without crashing', () => {
		shallow(< DefaultLayout id="default" />);
	});
});