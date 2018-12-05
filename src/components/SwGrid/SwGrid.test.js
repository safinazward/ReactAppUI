import React from 'react';
import { SwGrid } from './SwGrid';
import { shallow } from 'enzyme';

describe('<Grid/>', () => {

	it('renders without crashing', () => {

		shallow(
			<SwGrid />
		);

	});

	it('renders a layout with 1 item when new', () => {

		let grid = shallow(
			<SwGrid
				id='test'
			/>
		);

		grid.contains(<div className="gridItem" />)
	});


	it('can save layout when changed', () => {

		let mockSetElementState = jest.fn();

		let grid = shallow(
			<SwGrid
				id='test'
				setElementState={mockSetElementState}
			/>
		);

		let newLayout = [
			{ i: '1', x: 0, y: 0, w: 1, h: 1 },
			{ i: '2', x: 0, y: 1, w: 1, h: 1 }
		];

		grid.instance().layoutChanged(newLayout);

		//should set element state 'test' content to ''
		expect(mockSetElementState.mock.calls.length).toBe(1);
		expect(mockSetElementState.mock.calls[0][0]).toBe('test');

		//should save normalized version of the layout in the state
		let normalizedLayout = mockSetElementState.mock.calls[0][1].layout;

		newLayout.forEach((item, index) => {
			expect(normalizedLayout[item.i] === newLayout[index]);
		});

	});
	
	it('can remove items from a grid', () => {

		let mockSetElementState = jest.fn();
		let mockRemoveElementState = jest.fn();

		let layout= [
			{ i: '1', x: 0, y: 0, w: 1, h: 1 },
			{ i: '2', x: 0, y: 0, w: 1, h: 2 }
		];

		let grid = shallow(
			<SwGrid
				id='grid'
				layout={layout}
				setElementState={mockSetElementState}
				removeElementState={mockRemoveElementState}
			/>
		);

		grid.instance().removeItemClick(layout[0]);

		//should remove element state for 'grid>item1'
		expect(mockRemoveElementState.mock.calls.length).toBe(1);
		expect(mockRemoveElementState.mock.calls[0][0]).toBe('grid>item1');

		//should save element state for 'grid'
		expect(mockSetElementState.mock.calls.length).toBe(1);
		expect(mockSetElementState.mock.calls[0][0]).toBe('grid');

		//should save normalized version of the layout in the state
		let normalizedLayout = mockSetElementState.mock.calls[0][1].layout;

		//should have only the second item in the layout
		expect(Object.keys(normalizedLayout).length).toBe(1);
		expect(normalizedLayout[0].i).toBe('2');
	});

	it('can remove item by remove button', () => {

		let mockSetElementState = jest.fn();
		let mockRemoveElementState = jest.fn();

		let layout= [
			{ i: '1', x: 0, y: 0, w: 1, h: 1 },
			{ i: '2', x: 0, y: 0, w: 1, h: 2 }
		];

		let grid = shallow(
			<SwGrid
				id='grid'
				layout={layout}
				setElementState={mockSetElementState}
				removeElementState={mockRemoveElementState}
			/>
		);

		//remove first item by clicking in the remove button
		let removeBtn = grid.find('.removeItemBtn').first();
		removeBtn.simulate('click');

		//should remove element state for 'grid>item1'
		expect(mockRemoveElementState.mock.calls.length).toBe(1);
		expect(mockRemoveElementState.mock.calls[0][0]).toBe('grid>item1');

		//should save element state for 'grid'
		expect(mockSetElementState.mock.calls.length).toBe(1);
		expect(mockSetElementState.mock.calls[0][0]).toBe('grid');

		//should save normalized version of the layout in the state
		 let normalizedLayout = mockSetElementState.mock.calls[0][1].layout;

		//should have only the second item in the layout
		 expect(Object.keys(normalizedLayout).length).toBe(1);
		 expect(normalizedLayout[0].i).toBe('2');
	});

	it('should keep one layout when we remove all layouts from the grid', () => {

		let mockSetElementState = jest.fn();
		let mockRemoveElementState = jest.fn();

		let layout= [			
			{ i: '2', x: 0, y: 0, w: 1, h: 2 }
		];

		let grid = shallow(
			<SwGrid
				id='grid'
				layout={layout}
				setElementState={mockSetElementState}
				removeElementState={mockRemoveElementState}
			/>
		);

		//remove first item by clicking in the remove button
		let removeBtn = grid.find('.removeItemBtn').first();
		removeBtn.simulate('click');

		//should remove element state for 'grid>item1'
		expect(mockRemoveElementState.mock.calls.length).toBe(1);
		expect(mockRemoveElementState.mock.calls[0][0]).toBe('grid>item2');

		//should save normalized version of the layout in the state
		let normalizedLayout = mockSetElementState.mock.calls[0][1].layout;

		//should have only one item in the layout
		expect(Object.keys(normalizedLayout).length).toBe(1);
		expect(normalizedLayout[0].i).toBe('1');
	});
});