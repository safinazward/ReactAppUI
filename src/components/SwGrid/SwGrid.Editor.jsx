import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { emptyGridItem } from './SwGrid';

import { setElementState } from '../../actions/appActions';

export class SwGridEditor extends Component {

	constructor(props) {
		super(props);
		this.addItemClick = this.addItemClick.bind(this);
	}

	addItemClick() {
		let maxI = this.props.layout.reduce((max, item) => Math.max(max, parseInt(item.i, 10)), 0);
		let newItem = { ...emptyGridItem, i: (maxI + 1).toString() };
		this.props.setElementState(this.props.elementId, { layout: [...this.props.layout, newItem] });
	}

	render() {
		return (
			<form className="m-3">
				<div className="form-group row">
					<div className="col-sm-12">
						<button type="button" className="btn btn-sm btn-success float-right form-control" onClick={this.addItemClick}>
							Add box
						</button>
					</div>
				</div>
			</form>);
	}
}

const mapStateToProps = (state, props) => ({
	layout:  state.app.elements[props.elementId] && state.app.elements[props.elementId].layout
});

const mapDispatchToProps = dispatch => ({
	setElementState: (id, changes) => dispatch(setElementState(id, changes))
});

SwGridEditor.propTypes = {
	elementId: PropTypes.string,	
	layout: PropTypes.array,
	setElementState: PropTypes.func	
};

SwGridEditor.defaultProps = {
	layout: [emptyGridItem]	
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SwGridEditor));
