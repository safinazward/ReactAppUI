import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Placeholder from '../Placeholder';
import SideBar from '../SideBar';
import TopNavBar from '../TopNavBar';

const topBarStyle = {
	'position': 'fixed',
	'top': '0',
	'right': '0',
	'left': '0',
	'zIndex': '1030'
};

const sidebarStyle = {
	'position': 'fixed',
	'top': '0',
	'bottom': '0',
	'left': '0',
	'zIndex': '100',
	'padding': '56px 0 0',
	'boxShadow': 'inset -1px 0 0 rgba(0, 0, 0, .1)'
};

const mainStyle = {
	'padding': '54px 0 0'
}

class DefaultLayout extends Component {
	render() {
		return (
			<React.Fragment>
				<TopNavBar id={`${this.props.id}>topNavBar`} style={topBarStyle} />
				<div>
					<div className="row no-gutters">
						{/* SIDE MENU */}
						<nav className="col-md-2 d-none d-md-block bg-light" style={sidebarStyle}>
							<SideBar id={`${this.props.id}>sideBar`} />
						</nav>
						{/* MAIN CONTENT */}
						<main role="main" className="col-md-9 ml-sm-auto col-lg-10" style={mainStyle}>
							<Placeholder id={`${this.props.id}>content`} />
						</main>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

DefaultLayout.propTypes = {
	id: PropTypes.string.isRequired
};

export default DefaultLayout;
