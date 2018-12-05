import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import { setDatasource } from '../../actions/appActions';
import { fetchItems } from '../../actions/dataActions';
import EditableHOC from '../EditableHOC';

export class SwFilter extends Component {

	constructor(props) {
		super(props);		
		this.refreshClicked = this.refreshClicked.bind(this);
		this.rowsChanged = this.rowsChanged.bind(this);
		this.getFilterState = this.getFilterState.bind(this);
	}

	refreshClicked() {
		this.props.fetchItems(this.props.selectedDatasource);
	}

	rowsChanged(event) {
		let datasource = this.props.datasources[this.props.selectedDatasource];
		let filter = { ...this.getFilterState() };
		filter.rows = event.target.value;

		this.props.setDatasource({ ...datasource, filter: { ...filter } });
		this.props.fetchItems(this.props.selectedDatasource);
	}

	getFilterState() {
		let datasource = this.props.datasources[this.props.selectedDatasource];
		let filterState = datasource.filter || { rows: '10' };
		return filterState;
	}

	renderEmpty() {
		return (
			<div>
				<FormattedMessage id="ds.choose" />
			</div>
		);
	}

	renderContent() {
		let filterState = this.getFilterState();
		return (
			<div>
				<button id="refreshBtn" onClick={this.refreshClicked}>
					<span className="fa fa-refresh" />
				</button>
				<select id="rowOptions" onChange={this.rowsChanged} value={filterState.rows}>
					<option value="10">10</option>
					<option value="30">30</option>
					<option value="all">All</option>
				</select>
			</div>
		);
	}

	render() {
		if (this.props.selectedDatasource) {
			return this.renderContent();
		} else {
			return this.renderEmpty();
		}
	}
}

const mapStateToProps = (state, props) => ({
	editing: state.editor.editing,
	datasources: state.app.datasources,
	selectedDatasource: state.app.elements[props.id].datasource
});

const mapDispatchToProps = dispatch => ({
	fetchItems: (datasource) => dispatch(fetchItems(datasource)),	
	setDatasource: (datasource) => dispatch(setDatasource(datasource))
});

SwFilter.propTypes = {
	editing: PropTypes.bool,
	datasources: PropTypes.object,
	selectedDatasource: PropTypes.string,
	fetchItems: PropTypes.func,
	setDatasource: PropTypes.func
};

SwFilter.defaultProps = {
	editing: false,
	datasources: {},
	selectedDatasource: null
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EditableHOC(SwFilter, 'SwFilter/SwFilter.Editor')));
