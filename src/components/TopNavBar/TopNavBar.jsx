import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

class TopNavBar extends Component {
	render() {
		return (
			<nav className="topnavbar navbar navbar-expand-md navbar-dark" style={this.props.style}>
				<a className="navbar-brand" href="">
					<FormattedMessage id="app.title" defaultMessage="apptitle" />
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarCollapse">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<a className="nav-link" href="">
								<FormattedMessage id="nav.home" />
								<span className="sr-only">(current)</span>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="">Link</a>
						</li>
						<li className="nav-item">
							<a className="nav-link disabled" href="">Disabled</a>
						</li>
					</ul>
					<form className="form-inline mt-2 mt-md-0">
						<input className="form-control mr-sm-2" type="text" placeholder={this.props.intl.formatMessage({ id: 'search' })} aria-label={this.props.intl.formatMessage({ id: 'search' })} />
						<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
							<FormattedMessage id="search" />
						</button>
					</form>
				</div>
			</nav>
		);
	}
}

TopNavBar.propTypes = {
	style: PropTypes.object
};

export default injectIntl(TopNavBar);
