import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { IntlProvider } from 'react-intl';

import 'bootstrap/dist/js/bootstrap.js';
import './App.css';

import Placeholder from './components/Placeholder';
import EditorPanel from './components/Editor/EditorPanel';
import AppBar from './components/Editor/AppBar';
import NewAppButton from './components/Editor/NewAppButton';
import { listApps } from './actions/appActions';
import * as userSettingsActions from './actions/userSettingsActions';
import TranslationService from './services/translationService';



export class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			formats: {
				date: {
					longDate: {
						year: 'numeric',
						month: 'long',
						day: '2-digit'
					}
				}
			},
			locales: []
		};
		this.language = navigator.languages;
	}

	setLocales(locales){
		this.setState({ locales: locales });
		let locale = this.language.find(item => {
		return locales.find(locale => {
			return locale.code === item;
			})
		})
		this.language = locale ? locale : 'en';
	}

	async componentDidMount() {
		await TranslationService.getLocales()
			.then(locales => {
				locales.length > 0 && this.setLocales(locales);
			})
			.catch(error => { this.language = 'en' });
		this.props.listApps();
		this.props.setLocale(this.language);
		this.props.getTranslations(this.language);
		this.props.setDateFormat(this.language);
	}

	renderCreateYoutFirstApp() {
		return (
			<div className="d-flex align-items-center">
				<div className="col">
					<div className="jumbotron">
						<h1 className="display-4">
							<FormattedMessage id="app.welcome" />
						</h1>
						<p className="lead">
							<FormattedMessage id="app.createMessage" />
						</p>
						<NewAppButton />
					</div>
				</div>
			</div>
		);
	}

	renderLoading() {
		return (
			<div className="d-flex align-items-center">
				<div className="col">
					<span className="fa fa-circle-o-notch fa-2x fa-spin" />
				</div>
			</div>
		);
	}

	renderApp() {
		let appStyle = { ...this.props.app.customColors, marginRight: '0px' };
		if (this.props.editing && !this.props.editorPanelOverlay) {
			appStyle.marginRight = '250px';
		}

		let classNames = this.props.editing ? 'editing' : '';

		return (
			<div className={classNames} style={appStyle}>
				<Placeholder key={`${this.props.app.id}Root`} id="root" style={{ minHeight: '100vh' }} />
				<EditorPanel />
				<AppBar language={this.language} locales={this.state.locales} />
			</div>
		);
	}
	render() {
		let content;
		if (!this.props.apps || !this.props.userSettings.translations) {
			//waiting for the app list to be loaded
			content = this.renderLoading();
		} else {
			if (this.props.app.id) {
				//render current app
				content = this.renderApp();
			}
			else if (!this.props.app.id && this.props.apps.length === 0) {
				//there is no app to render
				content = this.renderCreateYoutFirstApp();
			} else {
				content = this.renderLoading();
			}
		}
		return (
			<Fragment>
				{this.props.userSettings.locale !== '' &&
					<IntlProvider locale={this.props.userSettings.locale} messages={this.props.userSettings.translations} formats={this.state.formats}>
						{content}
					</IntlProvider>
				}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	editing: state.editor.editing,
	editorPanelOverlay: state.editor.overlay,
	app: state.app,
	apps: state.editor.apps,
	userSettings: state.userSettings
});

const mapDispatchToProps = dispatch => ({	
	listApps: () => dispatch(listApps()),
	setLocale: (locale) => dispatch(userSettingsActions.setLocale(locale)),
	getTranslations: (locale) => dispatch(userSettingsActions.getTranslations(locale)), 
	setDateFormat: (locale) => dispatch(userSettingsActions.setDateFormat(locale))
});

App.propTypes= {
	editing: PropTypes.bool,
	editorPanelOverlay: PropTypes.bool,
	app: PropTypes.object,
	apps: PropTypes.array,
	userSettings: PropTypes.object,
	listApp: PropTypes.func,
	setLocale: PropTypes.func,
	getTranslations: PropTypes.func,
	setDateFormat: PropTypes.func 
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
