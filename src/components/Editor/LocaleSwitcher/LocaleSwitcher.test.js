import React from 'react';
import {
	shallow
} from 'enzyme';
import LocaleSwitcher from './LocaleSwitcher';

describe('Locale selector', () => {
	it('renders with options', () => {
		const selector = shallow(< LocaleSwitcher locales={[{ code: 'sv', name: 'Swedish' }]} icon='fa-calendar' />);
		expect(selector.find('option').length).toEqual(2);
	});

	it('sets english as the default selected value if we did not pass user language', () => {
		const selector = shallow(< LocaleSwitcher locales={[{ code: 'en', name: 'English' }]} icon='fa-calendar' />);
		expect(selector.state('selected')).toEqual('en');
	});

	it('sets the default selected value based on the user language', () => {
		const selector = shallow(< LocaleSwitcher locales={[{ code: 'en', name: 'English' }, { code: 'sv', name: 'Swedish' }]} userLanguage='sv' icon='fa-calendar' />);
		expect(selector.state('selected')).toEqual('sv');
	});

	it('dispatches onLocaleChange when we select new locale', () => {
		let mockOnLocaleChange = jest.fn();
		let selector = shallow(< LocaleSwitcher locales={[{ code: 'sv', name: 'Swedish' }]} onLocaleChange={mockOnLocaleChange} icon='fa-calendar' />);

		selector.find('select').simulate('change', { target: { value: 'en' } });

		expect(mockOnLocaleChange.mock.calls.length).toBe(1);
		expect(mockOnLocaleChange.mock.calls[0][0]).toBe('en');
	});

});