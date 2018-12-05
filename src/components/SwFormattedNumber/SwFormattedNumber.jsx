import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedNumber } from 'react-intl';
import { connect } from 'react-redux';

class SwFormattedNumber extends Component {
	render() {
		return (
			<IntlProvider locale={this.props.locale}>
				<FormattedNumber value={1222.99} />
			</IntlProvider>
		)
	}
};

const mapStateToProps = state => ({
	locale: state.userSettings.dateFormat
});

SwFormattedNumber.propTypes = {
	locale: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(SwFormattedNumber);