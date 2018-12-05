import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveApp } from '../../../actions/appActions';

export const SaveAppButton = props => (
	<button type="button" className="btn btn-primary" onClick={() => props.save(props.app)}>
		<span className="fa fa-save" />
	</button>
);

const mapStateToProps = state => ({
	app: state.app
});

const mapDispatchToProps = dispatch => ({
	save: (App) => { dispatch(saveApp(App)); }
});

SaveAppButton.propTypes= {
	app: PropTypes.object,
	save: PropTypes.func
}

SaveAppButton.defaultProps= {
	app: {}
}
export default connect(mapStateToProps, mapDispatchToProps)(SaveAppButton);
