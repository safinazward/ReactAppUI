import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppSwitcher from '../AppSwitcher';
import NewAppButton from '../NewAppButton';
import SaveAppButton from '../SaveAppButton';
import AddDatasourceButton from '../AddDatasourceButton';
import CustomizeColorsButton from '../CustomizeColorsButton';
import RemoveAppButton from '../RemoveAppButton';
import LocaleSwitcher from '../LocaleSwitcher';
import * as userSettingsActions from '../../../actions/userSettingsActions';

class AppBar extends Component {

	onLocaleChange = locale => {
		this.props.setLocale(locale);
		this.props.getTranslations(locale);
	}

	onDateFormatChange = locale => {
		this.props.setDateFormat(locale);
	}

	render() {
		let appBarStyle = {
			display: (this.props.editing) ? 'block' : 'none'
		};
		return (
			<div id="appBar" className="container" style={appBarStyle}>
				<div className="row justify-content-center">
					<div className="col-1">
						<AppSwitcher className="input" style={{ display: 'inline' }} />
					</div>
					<div className="col-2">
						<div className="input-group input-group-sm">
							<SaveAppButton />
							<NewAppButton />
							<AddDatasourceButton />
							<CustomizeColorsButton />
							<RemoveAppButton />
						</div>
					</div>
					{this.props.locales.length > 0 &&
						<Fragment>
							<div className="col-1">
								<LocaleSwitcher onLocaleChange={this.onLocaleChange} locales={this.props.locales} userLanguage={this.props.language} icon='fa-globe' />
							</div>
							<div className="col-1">
								<LocaleSwitcher onLocaleChange={this.onDateFormatChange} locales={this.props.locales} userLanguage={this.props.language} icon='fa-calendar' />
							</div>
						</Fragment>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	editing: state.editor.editing
});

const mapDispatchToProps = dispatch => ({	
	setLocale: (locale) => dispatch(userSettingsActions.setLocale(locale)),
	getTranslations: (locale) => dispatch(userSettingsActions.getTranslations(locale)), 
	setDateFormat: (locale) => dispatch(userSettingsActions.setDateFormat(locale))
});

AppBar.propTypes= {
	locales: PropTypes.array,
	language: PropTypes.string,
	editing: PropTypes.bool,
	setLocale: PropTypes.func,
	getTranslations: PropTypes.func, 
	setDateFormat: PropTypes.func
}

AppBar.defaultProps= {
	editing: false 
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
