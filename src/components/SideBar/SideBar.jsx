import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './SideBar.css';

class SideBar extends Component {
	render() {
		return (
			<div className="sidebar">
				<div className="col" style={{ padding: '0px', margin: '0px' }}>
					<div className="navsidebar-sticky flex-column nav-pillsk" id="v-pills-tab" role="tablist" aria-orientation="vertical">
						<a className="nav-link active text-light" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
							<FormattedMessage id="nav.home" defaultMessage="nav.home" />
						</a>
						<a className="nav-link text-light" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
							<FormattedMessage id="nav.profile" defaultMessage="nav.profile" />
						</a>
						<a className="nav-link text-light" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
							<FormattedMessage id="nav.email" defaultMessage="nav.email" />
						</a>
						<a className="nav-link  text-light" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">
							<FormattedMessage id="nav.company" defaultMessage="nav.company" />
						</a>
						<a className="nav-link  text-light" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">
							<FormattedMessage id="nav.case" defaultMessage="nav.case" />
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default SideBar;
