import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveApp } from '../../../actions/appActions';


export class NewAppButton extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.newApp = this.newApp.bind(this);

		this.closeBtnRef = React.createRef();

		this.state = {
			name: ''
		};
	}

	handleChange = evt => {
		this.setState({ [evt.target.id]: evt.target.value });
	}

	newApp() {
		if (this.state.name && this.state.name.trim() !== '') {
			let newApp = {
				name: this.state.name,
				elements: {},
				customColors: {},
				datasources: {}
			};

			this.setState({ name: '' });
			this.props.createNewApp(newApp);
			this.closeBtnRef.current.click();
		}
	}

	render() {
		return (
			<div>
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newAppModal">
					<span className="fa fa-plus" />
				</button>
				<div className="modal fade" id="newAppModal" tabIndex="-1" role="dialog" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header text-dark">
								<h5 className="modal-title" id="exampleModalLabel">New App</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={this.closeBtnRef}>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body text-dark">
								<form>
									<label htmlFor="name">App name</label>
									<input type="text" className="form-control" id="name" required onChange={this.handleChange} value={this.state.name} />
								</form>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" id="closeModalBtn" data-dismiss="modal">Close</button>
								<button id="createAppBtn" type="button" className="btn btn-primary" onClick={this.newApp}>Create!</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	createNewApp: (App) => { dispatch(saveApp(App)); }
});

NewAppButton.propTypes= {
	createNewApp: PropTypes.func
}

export default connect(null, mapDispatchToProps)(NewAppButton);
