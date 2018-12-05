import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { setEditorPanelTarget, setEditorPanelEditorComponent } from '../actions/editorActions';

const EditableHOC = (WrappedComponent, editorComponentPath) => {
	class _EditableHOC extends React.Component {
		constructor(props) {
			super(props);
			this.handleClick = this.handleClick.bind(this);
		}	

		handleClick(e, force) {
			e.stopPropagation();
			if (force || this.props.editing) {
				this.props.setEditorPanelTarget(this.props.id);
				this.props.setEditorPanelEditorComponent(editorComponentPath);
			}
		}

		render() {
			return (
				<span onClick={(e) => this.handleClick(e)} data-component-id={this.props.id} data-component-editor={editorComponentPath}>
					<WrappedComponent {...this.props} handleClick={this.handleClick} />
				</span>
			);
		}
	}
	_EditableHOC.displayName = `EditableHOC(${getDisplayName(WrappedComponent)})`;

	_EditableHOC.propsType = {
		id: PropTypes.string,
		editing: PropTypes.bool,
		setEditorPanelTarget: PropTypes.func,
		setEditorPanelEditorComponent: PropTypes.func
	}

	_EditableHOC.defaultProps = {
		editing: false
	}

  return _EditableHOC;
}

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const mapStateToProps = state => ({
	editing: state.editor.editing	
});

const mapDispatchToProps = dispatch => ({
	setEditorPanelTarget: (id) => dispatch(setEditorPanelTarget(id)),
	setEditorPanelEditorComponent: (editorComponentPath) => dispatch(setEditorPanelEditorComponent(editorComponentPath))
});


EditableHOC.propTypes = {
	WrappedComponent: PropTypes.element,
	editorComponentPath: PropTypes.string	
};

const composedEditableHOC = compose(
	connect(mapStateToProps, mapDispatchToProps),
	EditableHOC
);
export default composedEditableHOC; 