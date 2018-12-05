import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import SwLabel from '../SwLabel';

class UserHeader extends Component {
	render() {
		return (
			<div>
				<div className="col-12 no-gutters" >
					<div className="row" style={{ height: '150' }}>
						<div className="col-2 align-items-center">
							<img src="/imgs/sweetAvatar.png" className="img-thumbnail rounded-circle" style={{ height: '100', width: '100px' }} alt="thumbnail" />
						</div>
						<div className="col-10 text-left">
							<div className="container">
								<h1 className="display-4"><FormattedMessage id="userHeader.hi" defaultMessage="Hi" /> Daniel!</h1>
								<SwLabel translationKey="userHeader.message">
									<p className="lead"><FormattedMessage id="userHeader.message" defaultMessage="This is the user header!" />
										<span className="fa fa-smile-o" />
									</p>
								</SwLabel>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default injectIntl(UserHeader);
