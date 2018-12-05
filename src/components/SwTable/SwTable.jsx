import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

import { fetchItems } from '../../actions/dataActions';
import EditableHOC from '../EditableHOC';


export class SwTable extends Component {

	getDataSource(datasourceId) {		

		let datasource = this.props.datasources[datasourceId];
		let datasourceContent = this.props.datasourceContents[datasourceId];

		//ds does not exists
		if (!datasource) {
			return null;
		}
		
		if (datasourceContent) {
			return datasourceContent;
		} else {
			//dispatch action to load the DS
			this.props.fetchItems(datasourceId);

			//return the datasource with loading status
			return { ...datasource, loading: true };
		}
	}	

	renderEmpty() {
		return (
			<div>
				<FormattedMessage id="ds.choose" />
			</div>
		);
	}

	renderContent() {
		let datasource = this.getDataSource(this.props.selectedDatasource);

		if (!datasource) {
			return (
				<div>Datasource {this.props.selectedDatasource} was removed</div>
			);
		}

		if (datasource.loading) {
			return (
				<div>Loading...</div>
			);
		}

		if (datasource.error) {
			return (
				<div>Error loading datasource</div>
			);
		}

		if (datasource.content && datasource.content.length > 0) {

			let content = datasource.filteredContent || datasource.content;

			let heading = Object.keys(content[0]).map((key, index) => {
				return (<th key={index}>{key}</th>);
			});

			let rows = content.map((element, trIndex) => {
				let tds = Object.keys(element).map((key, tdIndex) => {
					return (<td key={tdIndex}>{typeof element[key] !== 'object' ? element[key] : ''}</td>);
				})
				return (<tr key={trIndex}>{tds}</tr>);
			});

			return (
				<table className="table" >
					<thead className="thead-dark">
						<tr>
							{heading}
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			);
		} else {
			return (
				<div>The datasource is empty :_(</div>
			)
		}
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
	datasourceContents: state.data.datasources,
	selectedDatasource: state.app.elements[props.id].datasource
});

const mapDispatchToProps = dispatch => ({	
	fetchItems: (datasourceId) => dispatch(fetchItems(datasourceId))
});

SwTable.propTypes = {
	editing: PropTypes.bool,
	datasources: PropTypes.object,
	datasourceContents: PropTypes.object,
	selectedDatasource: PropTypes.string,
	fetchItems: PropTypes.func
};

SwTable.defaultProps = {
	editing: false,	
	datasources: {},
	datasourceContents: {},
	selectedDatasource: null
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EditableHOC(SwTable, 'SwTable/SwTable.Editor')));
