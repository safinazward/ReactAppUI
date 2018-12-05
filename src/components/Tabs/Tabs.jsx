import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Placeholder from '../Placeholder';

class Tabs extends Component {
	render() {
		return (
			<div>
				<ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
					<li className="nav-item">
						<a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
					</li>
				</ul>
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
						<Placeholder id={this.props.id + '.tab1'} style={{ minHeight: '100px' }} />
					</div>
					<div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
						<Placeholder id={this.props.id + '.tab2'} style={{ minHeight: '100px' }} />
					</div>
					<div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
						<Placeholder id={this.props.id + '.tab3'} style={{ minHeight: '100px' }} />
					</div>
				</div>
			</div>
		);
	}
}

Tabs.propTypes = {
	id: PropTypes.string
};

export default Tabs;
