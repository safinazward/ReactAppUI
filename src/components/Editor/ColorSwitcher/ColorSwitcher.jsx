import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';


class ColorSwitcher extends Component {

	constructor(props) {
		super(props);
		this.state = { displayColorPicker: false };
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick = () => {
		this.setState({ displayColorPicker: !this.state.displayColorPicker });
	};

	handleClose = () => {
		this.setState({ displayColorPicker: false });
	};

	handleChange = color => {
		this.props.handleChange(this.props.colorVar, color && color.hex);
	};

	render() {
		const styles = reactCSS({
			default: {
				color: {
					width: '36px',
					height: '14px',
					borderRadius: '2px',
					background: `${this.props.color}`
				},
				swatch: {
					padding: '5px',
					background: '#fff',
					borderRadius: '1px',
					boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
					display: 'inline-block',
					cursor: 'pointer'
				},
				popover: {
					position: 'absolute',
					zIndex: '2'
				},
				cover: {
					position: 'fixed',
					top: '0px',
					right: '0px',
					bottom: '0px',
					left: '0px'
				}
			}
		});

		return (
			<div className="row">
				<label className="col-sm-7 p-2">{this.props.title}</label>
				<div className="col-sm-5 pt-2">
					<div id="showPicker" style={styles.swatch} onClick={this.handleClick}>
						<div style={styles.color} />
					</div>
				</div>
				{this.state.displayColorPicker && (
					<div style={styles.popover}>
						<div id="closePicker" style={styles.cover} onClick={this.handleClose} />
						<SketchPicker
							color={this.props.color}
							onChange={this.handleChange}
						/>
					</div>
				)}
			</div>
		);
	}
}

ColorSwitcher.propTypes= {
	colorVar: PropTypes.string,
	color: PropTypes.string,	
	title: PropTypes.string,
	handleChange: PropTypes.func
}

export default ColorSwitcher;
