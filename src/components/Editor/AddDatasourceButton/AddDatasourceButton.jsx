import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addDatasource, removeDatasource } from '../../../actions/appActions';

export const initialState = {
	name: '',
	url: '',
	token: ''
};

export class AddDatasourceButton extends Component {

	constructor(props) {
		super(props);
		this.state = initialState;
		this.handleChange = this.handleChange.bind(this);
		this.saveDatasource = this.saveDatasource.bind(this);
	}

	handleChange = evt => {
		this.setState({ [evt.target.id]: evt.target.value });
	}

	saveDatasource = () => {
		this.props.addDatasource(this.state.name, this.state.url, this.state.token);
		this.setState(initialState)
	}

	render() {
		return (
			<div>
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
					<span className="fa fa-database" />
				</button>
				<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header text-dark">
								<h5 className="modal-title" id="exampleModalLabel">Add datasource</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body text-dark">
								<form className="mb-4">
									<div className="form-group row">
										<label htmlFor="name" className="col-sm-4 col-form-label">Datasource name</label>
										<div className="col-sm-8">
											<input type="text" className="form-control" id="name" required onChange={this.handleChange} value={this.state.name} />
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="url" className="col-sm-4 col-form-label">Url</label>
										<div className="col-sm-8">
											<input type="url" className="form-control" id="url" aria-describedby="urlHelp" placeholder="https://example.com" pattern="https://.*" required onChange={this.handleChange} value={this.state.url} />
											<small id="urlHelp" className="form-text text-muted">Add api url to fetch data from.</small>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="token" className="col-sm-4 col-form-label">Token</label>
										<div className="col-sm-8">
											<input type="text" className="form-control" id="token" onChange={this.handleChange} value={this.state.token} />
										</div>
									</div>
								</form>
								{<div className="card text-left">
									<div className="card-header">
										Datasources
    								</div>
									<div className="card-body">
										<ul className="list-group">
											{Object.keys(this.props.datasources).map((k, index) => (
												<li className="list-group-item d-flex justify-content-between align-items-center text-dark" key={k}>
													{this.props.datasources[k].name}
													<button id={this.props.datasources[k].name} type="button" className="close" aria-label="Close" onClick={() => this.props.removeDatasource(k)}>
														<span aria-hidden="true">&times;</span>
													</button>
												</li>
											))}
										</ul>
									</div>
								</div>}
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" id="closeModalBtn" data-dismiss="modal">Close</button>
								<button id="saveBtn" type="button" className="btn btn-primary" onClick={this.saveDatasource}>Save changes</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	datasources: state.app.datasources
});

const mapDispatchToProps = dispatch => ({
	addDatasource: (name, url, token) => dispatch(addDatasource(name, url, token)),
	removeDatasource: name => dispatch(removeDatasource(name))
});

AddDatasourceButton.propTypes = {
	datasources: PropTypes.object,
	addDatasource: PropTypes.func,
	removeDatasource: PropTypes.func
}

AddDatasourceButton.defaultProps = {
	datasources: {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDatasourceButton);