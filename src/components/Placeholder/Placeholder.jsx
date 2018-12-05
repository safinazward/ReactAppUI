import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import EditableHOC from '../EditableHOC';

export class Placeholder extends Component {
	constructor(props) {
		super(props);
		this.state = { module: null };
	}

	renderEmpty() {
		return (
			<div className="placeholder empty d-flex align-items-center" style={this.props.style} >
				<div className="col">
					<span id="emptyEditBtn" className="fa fa-edit fa-2x" onClick={(e) => this.props.handleClick(e, true)} />
				</div>
			</div>
		);
	}

	renderLoading() {
		return (
			<div className="placeholder empty d-flex align-items-center" style={this.props.style} >
				<div className="col">
					<span className="fa fa-circle-o-notch fa-2x fa-spin" />
				</div>
			</div>
		);
	}

	renderContent(module, content) {
		const TagName = module;

		let placeholderStyle = {
			...this.props.style,
			padding: this.props.padding
		};

		let contentNameParts = content.split('/');
		let contentName = contentNameParts[contentNameParts.length - 1];

		let classNames = this.props.selected ? "placeholder selected" : "placeholder";

		if (this.state.showPadding) {
			classNames += " showPadding";
		}

		return (
			<div className={classNames} style={placeholderStyle} >
				<TagName id={this.props.id + '>' + contentName} {...this.props} />
			</div>
		);
	}

	componentDidUpdate(prevProps) {

		//if the content has been changed unload the old module
		if (this.props.content !== prevProps.content) {
			this.setState({ module: null });
		}

		//apply showPadding class for 300ms when the padding is changed
		if (this.props.selected && (this.props.padding !== prevProps.padding)) {
			this.setState({ showPadding: true });
			setTimeout(() => this.setState({ showPadding: false }), 300);
		}
	}

	render() {

		if (this.props.content) {
			//start loading the module if necessary
			if (!this.state.module) {
				import(`../${this.props.content}`).then(module => {
					this.setState({ module: module.default });
				});
			}

			if (this.state.module) //the content was set and the module is loaded
			{
				return this.renderContent(this.state.module, this.props.content);
			}
			else //the content was set but the module is not loaded yeet
			{
				return this.renderLoading();
			}
		} else {
			//the content was not set
			return this.renderEmpty();
		}
	}
}

const mapStateToProps = (state, props) => ({
	padding: (state.app.elements[props.id]) && state.app.elements[props.id].padding,
	content: (state.app.elements[props.id]) ? state.app.elements[props.id].content : props.content
});

Placeholder.propTypes = {
	id: PropTypes.string,
	content: PropTypes.string,
	style: PropTypes.object,
	padding: PropTypes.string,
	handleClick: PropTypes.func	
};

Placeholder.defaultProps = {	
	padding:'3px'
};

export const ReadOnlyPlaceholder = injectIntl(connect(mapStateToProps)(Placeholder));
export default injectIntl(connect(mapStateToProps)(EditableHOC(Placeholder, 'Placeholder/Placeholder.Editor')));
