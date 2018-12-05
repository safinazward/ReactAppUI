import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { setElementState, removeElementState } from '../../actions/appActions';
import Placeholder from '../Placeholder';
import EditableHOC from '../EditableHOC';

import './SwGrid.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGrid = WidthProvider(GridLayout);

export class SwGrid extends Component {

	constructor(props) {
		super(props);
		this.layoutChanged = this.layoutChanged.bind(this);
	}

	removeItemClick(item) {
		let itemId = `${this.props.id}>item${item.i}`;
		this.props.removeElementState(itemId);

		let newLayout = this.props.layout.filter(v => v.i !== item.i);

		if (newLayout.length === 0) {
			newLayout.push({ ...emptyGridItem });
		}

		this.props.setElementState(this.props.id, { layout: newLayout });
	}

	layoutChanged(newLayout) {
		this.props.setElementState(this.props.id, { layout: newLayout.map(i => { return { ...i }; }) });
	}

	render() {
		return (
			<div>
				<ReactGrid
					className="layout"
					cols={12}
					rowHeight={50}
					margin={[0, 0]}
					isDraggable={this.props.editing}
					isResizable={this.props.editing}
					onLayoutChange={this.layoutChanged}

					// THIS FIXES THE NESTED GRIDS DRAG PROBLEM
					onDragStart={(layout, oldItem, newItem, placeholder, e, element) => { e.stopPropagation(); }}
				>
					{this.props.layout.map((item, index) => {
						return (
							<div className="gridItem" key={item.i} data-grid={item}>
								<div className="gridItemToolbar">
									<button className="removeItemBtn btn btn-sm btn-success float-right" onClick={(e) => this.removeItemClick(item)}>X</button>
								</div>
								<Placeholder id={`${this.props.id}>item${item.i}`} />
							</div>
						);
					})}
				</ReactGrid>
			</div>
		);
	}
}

export const emptyGridItem = { i: '1', x: 0, y: 0, w: 1, h: 1 };

const mapStateToProps = (state, props) => ({
	layout: state.app.elements[props.id].layout
});

const mapDispatchToProps = dispatch => ({
	setElementState: (id, changes) => dispatch(setElementState(id, changes)),
	removeElementState: (id) => dispatch(removeElementState(id))
});

SwGrid.propTypes = {
	id: PropTypes.string,
	editing: PropTypes.bool,
	layout: PropTypes.array,
	setElementState: PropTypes.func,
	removeElementState: PropTypes.func	
};

SwGrid.defaultProps = {	
	editing: false,
	layout: [emptyGridItem]	
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EditableHOC(SwGrid, 'SwGrid/SwGrid.Editor')));
