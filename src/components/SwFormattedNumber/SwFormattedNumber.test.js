import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SwFormattedNumber from './SwFormattedNumber';

describe('<SwFormattedNumber />', () => {

	it('renders without crashing', () => {
		const state = {userSettings:{ dateFormat:'sv'}};
		const store = configureStore()(state);
		shallow(<SwFormattedNumber store={store} />);
	});

});