import React from 'react';
import { Placeholder } from './Placeholder';
import UserHeader from '../UserHeader';
import { shallow } from 'enzyme';

describe('<Placeholder/>', () => {

	it('renders PLaceholder without crashing', () => {

		shallow(
			<Placeholder />
		);

	});

	it('has an edit button when its empty', () => {

		let mockHandleClick = jest.fn();

		let placeholder = shallow(
			<Placeholder handleClick={mockHandleClick} />
		);

		let editButton = placeholder.find('#emptyEditBtn');
		expect(editButton.length).toBe(1);

		editButton.simulate('click');

		expect(mockHandleClick.mock.calls.length).toBe(1);
	});

	it('renders loading icon', () => {

		let placeholder = shallow(
			<Placeholder content='./userHeader' />
		);

		//should render the loading icon
		expect(placeholder.find('.fa-circle-o-notch').length).toBe(1);
	});

	it('renders the specified content when the module is loaded', () => {

		let placeholder = shallow(
			<Placeholder content='./userHeader' />
		);

		//supply the userHeader module
		placeholder.setState({ module: UserHeader });

		expect(placeholder.find('#emptyEditBtn').length).toBe(0);
		expect(placeholder.find('.fa-circle-o-notch').length).toBe(0);
	});
	
});
