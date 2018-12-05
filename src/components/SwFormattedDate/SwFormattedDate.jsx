import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

class SwFormattedDate extends Component {
	render() {
		return (
			<IntlProvider locale={this.props.locale}>
				<FormattedDate value={new Date()} format='longDate' />
			</IntlProvider>
		)
	}
};

const mapStateToProps = state => ({
	locale: state.userSettings.dateFormat
});

SwFormattedDate.propTypes = {
	locale: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(SwFormattedDate);