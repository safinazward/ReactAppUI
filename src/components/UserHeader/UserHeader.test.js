import React from 'react';

import UserHeader from './UserHeader';

describe('The user header', () => {
	it('renders without crashing', () => {

		global.shallowWithIntl(
			<UserHeader />
		);

	});
});