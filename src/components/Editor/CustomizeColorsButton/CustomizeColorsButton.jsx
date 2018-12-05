import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ColorSwitcher from '../ColorSwitcher';
import { setCustomColor } from '../../../actions/appActions';

export class CustomizeColorsButton extends Component {

	constructor(props) {
		super(props);
		this.closeBtnRef = React.createRef();
	}

	render() {
		return (
			<div>
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#customizeColorsModal">
					<span className="fa fa-paint-brush" />
				</button>
				<div className="modal fade" id="customizeColorsModal" tabIndex="-1" role="dialog" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header text-dark">
								<h5 className="modal-title" id="exampleModalLabel">Customize Colors</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={this.closeBtnRef}>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body text-dark">
								<ColorSwitcher title="Primary color" colorVar="--theme-primary-color" color={this.props.primaryColor} handleChange={this.props.handleColorChange} />
								<ColorSwitcher title="Secondary color" colorVar="--theme-secondary-color" color={this.props.secondaryColor} handleChange={this.props.handleColorChange} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	primaryColor: state.app.customColors['--theme-primary-color'] || getComputedStyle(document.body).getPropertyValue('--theme-primary-color'),
	secondaryColor: state.app.customColors['--theme-secondary-color'] || getComputedStyle(document.body).getPropertyValue('--theme-secondary-color')
});

const mapDispatchToProps = dispatch => ({
	handleColorChange: (colorVar, color) => dispatch(setCustomColor(colorVar, color))
});

CustomizeColorsButton.propTypes= {
	primaryColor: PropTypes.string,
	secondaryColor: PropTypes.string,
	handleColorChange: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeColorsButton);
