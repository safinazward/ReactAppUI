import React from 'react';
import { mount, shallow } from 'enzyme';
import { SketchPicker } from 'react-color';

import ColorSwitcher from './ColorSwitcher';

describe('The color switcher', () => {
	it('renders correctly', () => {
		const ColorSwitcherComponent = shallow(< ColorSwitcher />);
		expect(ColorSwitcherComponent).toMatchSnapshot();
	});

	it('should render title', () => {
		const wrapper = mount(< ColorSwitcher title="Primary Color" />);
		expect(wrapper.find('label').text()).toEqual('Primary Color');
	});

	it('should display SketchPicker when clicking on show picker button', () => {
		const wrapper = mount(< ColorSwitcher />);
		const showPickerBtn = wrapper.find('#showPicker');
		showPickerBtn.simulate('click');
		wrapper.update();
		const sketchPicker = wrapper.find('.sketch-picker');
		expect(sketchPicker.length).toEqual(1);
	});

	it('should close SketchPicker when clicking on close picker button', () => {
		const wrapper = mount(< ColorSwitcher />);
		const showPickerBtn = wrapper.find('#showPicker');
		showPickerBtn.simulate('click');
		wrapper.update();
		expect(wrapper.find('.sketch-picker').length).toEqual(1);
		const closePickerBtn = wrapper.find('#closePicker');
		closePickerBtn.simulate('click');
		wrapper.update();
		expect(wrapper.find('.sketch-picker').length).toEqual(0);
	});

	it('should display SketchPicker when clicking on show picker button', () => {
    const handleChange = jest.fn();
    const wrapper = shallow( < ColorSwitcher handleChange = {handleChange} /> );
		wrapper.setState({displayColorPicker:true});
    const showPickerBtn = wrapper.find(SketchPicker);
    showPickerBtn.simulate('change');
    //wrapper.update();
    //const sketchPicker = wrapper.find('.sketch-picker');
    //sketchPicker.children().first().simulate('click');
    expect(handleChange).toHaveBeenCalled();
  });
});