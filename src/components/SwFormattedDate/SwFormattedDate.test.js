import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { FormattedDate } from 'react-intl';

import SwFormattedDate from './SwFormattedDate';

describe('<SwFormattedDate />', () => {

	it('renders without crashing', () => {
		const state = {userSettings:{ dateFormat:'sv'}};
		const store = configureStore()(state);
		const wrapper = shallow(<SwFormattedDate store={store} />);
		expect(wrapper.dive().find(FormattedDate).length).toEqual(1);
	});

});