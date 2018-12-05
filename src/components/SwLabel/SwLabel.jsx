import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Popover, PopoverBody } from 'reactstrap';
import { AvForm, AvInput } from 'availity-reactstrap-validation';

import TranslationService from '../../services/translationService';
import { updateTranslation } from '../../actions/userSettingsActions';


import './SwLabel.css';

class SwLabel extends Component {

	constructor(props) {
		super(props);
		this.save = this.save.bind(this);
		this.toggle = this.toggle.bind(this);
		this.state = {
			popoverOpen: false
		};
	}

	toggle() {
		this.setState({
			popoverOpen: !this.state.popoverOpen
		});
	}

	save(event, value) {
		TranslationService.updateCustomTranslation(
			this.props.locale,
			this.props.translationKey,
			value.text
		).then(() => {
			this.props.updateTranslation(this.props.translationKey, value.text);
			this.setState({
				popoverOpen: !this.state.popoverOpen
			});
		});
	}

	render() {
		return (
			<div>
				{this.props.editing &&
					(
						<span>
							<span className="icon fa fa-pencil-square" id="Popover1" onClick={this.toggle} />
							<Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
								<PopoverBody>
									<AvForm onValidSubmit={this.save}>
										<AvInput name="text" value={this.props.intl.formatMessage({ id: this.props.translationKey })} />
									</AvForm>
								</PopoverBody>
							</Popover>
						</span>
					)
				}
				{this.props.children}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	editing: state.editor.editing,
	locale: state.userSettings.locale
});

const mapDispatchToProps = dispatch => ({
	updateTranslation: (translationKey, text) => dispatch(updateTranslation(translationKey, text))
});

SwLabel.propTypes = {
	locale: PropTypes.string.isRequired,
	translationKey: PropTypes.string.isRequired,
	editing: PropTypes.bool,
	updateTranslation: PropTypes.func
};

SwLabel.defaultProps = {
	editing: false
};

export default injectIntl(connect(mapStateToProps,mapDispatchToProps)(SwLabel));
