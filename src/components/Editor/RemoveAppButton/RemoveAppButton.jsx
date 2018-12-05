import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeApp } from '../../../actions/editorActions';

export class RemoveAppButton extends Component {

	constructor(props) {
		super(props);
		this.removeClicked = this.removeClicked.bind(this);
	}

	removeClicked() {
		if (this.props.id) {
			this.props.removeApp(this.props.id);
		}
	}

	render() {
		return (
			<button type="button" className="btn btn-primary" onClick={this.removeClicked}>
				<span className="fa fa-remove" />
			</button>
		);
	}
}

const mapStateToProps = state => ({
	id: state.app.id
});

const mapDispatchToProps = dispatch => ({
	removeApp: (id) => dispatch(removeApp(id))
});

RemoveAppButton.propTypes= {
	id: PropTypes.string.isRequired,	
	removeApp: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveAppButton);
