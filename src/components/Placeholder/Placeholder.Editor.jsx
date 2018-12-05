import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { setElementState, removeElementState } from '../../actions/appActions';

export class PlaceholderEditor extends Component {

	constructor(props) {
		super(props);
		this.changeContent = this.changeContent.bind(this);
		this.onPaddingChanged = this.onPaddingChanged.bind(this);
	}

	changeContent(event) {
		//remove current child elements from app state
		this.props.removeElementState(this.props.elementId);

		//saves new content setting
		let content = event.target.value;
		this.props.setElementState(this.props.elementId, { content: content });
	}

	onPaddingChanged(event) {
		if (event.target.value) {
			let value = parseInt(event.target.value, 10) + 'px';
			this.props.setElementState(this.props.elementId, { padding: value });
		}
	}

	render() {
		let paddingValue = parseInt(this.props.padding, 10);

		return (
			<form className="m-3">
				<div className="form-group row">
					<label className="col-sm-4 col-form-label" htmlFor="formControlRange">Padding: </label>
					<div className="col-sm-8">
						<input type="range" className="float-right form-control-range-sm" min="0" max="60" step="1" value={paddingValue} onChange={this.onPaddingChanged} />
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-4 col-form-label" htmlFor="selectContent">Content: </label>
					<div className="col-sm-8">
						<select id="selectContent" className="float-right form-control-sm" value={this.props.content || ''} onChange={this.changeContent}>
							<option value="">Select</option>
							<option value="DefaultLayout">Layout</option>
							<option value="UserHeader">User Header</option>
							<option value="SwFilter">Filter</option>
							<option value="SwTable">Table</option>
							<option value="SwGrid">Grid</option>
							<option value="RandomImage">Image</option>
							<option value="HighChart">HighChart</option>
							<option value="SideBar">SideBar</option>
							<option value="SwFormattedDate">Date</option>
							<option value="SwFormattedNumber">Number</option>
						</select>
					</div>
				</div>
			</form>
		);
	}
}

const mapStateToProps = (state, props) => ({
	padding: (state.app.elements[props.elementId]) && state.app.elements[props.elementId].padding ,
	content: (state.app.elements[props.elementId]) ? state.app.elements[props.elementId].content : props.content
});

const mapDispatchToProps = dispatch => ({
	setElementState: (id, changes) => dispatch(setElementState(id, changes)),
	removeElementState: (id) => dispatch(removeElementState(id))
});

PlaceholderEditor.propTypes = {
	elementId: PropTypes.string,
	content: PropTypes.string,	
	padding: PropTypes.string,
	setElementState: PropTypes.func,
	removeElementState: PropTypes.func	
};

PlaceholderEditor.defaultProps = {	
	padding:'3px'
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PlaceholderEditor));
