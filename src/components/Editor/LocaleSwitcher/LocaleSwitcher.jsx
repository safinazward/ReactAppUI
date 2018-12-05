import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LocaleSwitcher extends Component {

	constructor(props) {
		super(props);

		this.onLocaleChange = this.onLocaleChange.bind(this);
		this.state = {
			selected: ''
		};
	}

	componentDidMount() {

		let defaultLocale = this.props.locales.find(locale => locale.code === this.props.userLanguage);
		this.setState({ selected: defaultLocale ? defaultLocale.code : 'en' });
	}

	onLocaleChange(event) {
		if (this.props.onLocaleChange) {
			this.props.onLocaleChange(event.target.value);
		}
		this.setState({ selected: event.target.value });
	}

	render() {
		return (
			<div className="input-group">
				<div className="input-group-prepend">
					<span className={`input-group-text pt-2 fa ${this.props.icon}`} id="basic-addon1" />
				</div>
				<select className="custom-select" value={this.state.selected} onChange={this.onLocaleChange}>
					<option value=''>Select...</option>
					{this.props.locales.map((l, i) => { return <option key={l.code} value={l.code}>{l.name}</option> })}
				</select>
			</div>
		)
	}
}

LocaleSwitcher.propTypes= {
	locales: PropTypes.array,
	userLanguage: PropTypes.string,	
	icon: PropTypes.string.isRequired,
	onLocaleChange: PropTypes.func
}

LocaleSwitcher.defaultProps= {
	locales: []
}

export default LocaleSwitcher;
