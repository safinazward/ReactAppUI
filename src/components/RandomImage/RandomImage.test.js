import React from 'react';
import RandomImage from './RandomImage';
import {
	shallow
} from 'enzyme';

describe('The random image', () => {
	it('renders without crashing', () => {
		shallow(< RandomImage />);
	});
});