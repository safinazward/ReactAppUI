import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleEditMode, setEditorPanelTarget, setEditorPanelEditorComponent } from '../../../actions/editorActions';
import { ReadOnlyPlaceholder } from '../../Placeholder';

import './EditorPanel.css';

class EditorPanel extends Component {

	constructor(props) {
		super(props);

		this.selectComponent = this.selectComponent.bind(this);
	}

	selectComponent(id) {
		if (id !== this.props.selectedElementId) {			
			this.props.setEditorPanelTarget(id);
			// get selected element editor
			let selectedComponent = document.querySelector( '[ data-component-id='+CSS.escape(id)+' ]' );
			let editor =null;
			if(selectedComponent)
				editor = selectedComponent.getAttribute("data-component-editor");
			if (editor) 
				this.props.setEditorPanelEditorComponent(editor);			
		}
	}

	render() {

		const editorPanelStyle = {
			right: this.props.editing ? '0px' : '-250px',
			diplay: this.props.editing ? 'block' : 'none'
		};

		let toolbarStyle = {
			right: this.props.editing ? '250px' : '0px'
		};

		let pathSections = this.props.selectedElementId ? this.props.selectedElementId.split('>') : [];
		let breadcrumb = pathSections.flatMap((v, i) => {
			return {
				label: v,
				id: pathSections.slice(0, i + 1).join('>')
			};
		});

		let breadcrumbStyle = { cursor: 'pointer' };

		return (
			<div id="editor">
				<nav id="editorPanel" style={editorPanelStyle}>
					<div className="sidebar-header m-2">
						{breadcrumb.map((b, i) =>
							<span style={breadcrumbStyle} key={b.id} onClick={() => this.selectComponent(b.id)} >
								{b.label}
								{(i < breadcrumb.length - 1) ? ' > ' : ''}
							</span>
						)}
					</div>
					<div>
						{(this.props.editorComponent) ? <ReadOnlyPlaceholder id="ComponentEditorPlaceholder" content={this.props.editorComponent} elementId={this.props.selectedElementId} /> : <p className="m-3">Select a component</p>}
					</div>
				</nav>

				<div id="editorToolbar" style={toolbarStyle}>
					<button id="toggleEditBtn" className="btn btn-sm" onClick={this.props.toggleEditMode}>
						<span className="fa fa-cog" />
					</button>
				</div>
			</div>
		);

	}
}

const mapStateToProps = state => ({
	editing: state.editor.editing,
	selectedElementId: state.editor.selectedElementId,
	editorComponent: state.editor.editorComponent
});

const mapDispatchToProps = dispatch => ({
	toggleEditMode: () => dispatch(toggleEditMode()),
	setEditorPanelTarget: (id) => dispatch(setEditorPanelTarget(id)),	
	setEditorPanelEditorComponent: (editorComponentPath) => dispatch(setEditorPanelEditorComponent(editorComponentPath))
});

EditorPanel.propTypes= {
	editing: PropTypes.bool,
	selectedElementId: PropTypes.string,	
	editorComponent: PropTypes.string,
	toggleEditMode: PropTypes.func,
	setEditorPanelTarget: PropTypes.func,
	setEditorPanelEditorComponent: PropTypes.func
}

EditorPanel.defaultProps= {
	editing: false,
	selectedElementId: null,
	editorComponent: null
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditorPanel);
