import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getApp } from '../../../actions/appActions';

class AppSwitcher extends Component {

	constructor(props) {
		super(props);
		this.changeApp = this.changeApp.bind(this);
	}

	changeApp(event) {
		this.props.getApp(event.target.value);
	}

	render() {
		return (
			<div className="input-group input-group-sm">
				<select className="custom-select" id="appSelect" onChange={this.changeApp} value={this.props.selectedAppId}>
					{this.props.appList.map((app) => {
						return (
							<option key={app.id} value={app.id}>{app.name}</option>
						);
					})}
				</select>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	appList: state.editor.apps,
	selectedAppId: state.app.id
});

const mapDispatchToProps = dispatch => ({	
	getApp: (appId) => dispatch(getApp(appId))
});

AppSwitcher.propTypes= {
	appList: PropTypes.array,
	selectedAppId: PropTypes.string,	
	getApp: PropTypes.func
}

AppSwitcher.defaultProps= {
	appList: [],
	selectedAppId: '' 
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSwitcher);
