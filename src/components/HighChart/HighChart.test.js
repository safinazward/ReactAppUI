import React from 'react';
import ReactDOM from 'react-dom';
import HighChart from './HighChart';
import {
	shallow
} from 'enzyme';

describe('The highchart', () => {
	it('renders HighChart without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(< HighChart />, div);
	});

	it('renders without crashing (enzyme version)', () => {
		shallow(< HighChart />);
	});
});