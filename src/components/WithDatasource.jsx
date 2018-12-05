import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap'; 

import { setElementState } from '../actions/appActions';

const WithDatasource = (WrappedComponent) => {
  class _WithDatasource extends React.Component {
		constructor(props) {
      super(props);
      this.changeDatasource = this.changeDatasource.bind(this);
    }

    changeDatasource = evt => {		
      this.props.setElementState(this.props.elementId, { datasource: evt.target.value });
    }

		render() {
      return (
        <Form className="m-3">
          <WrappedComponent {...this.props} />            
          <FormGroup row>
            <Label for="ds" sm={5}>Datasource</Label>
            <Col sm={7}>
              <Input type="select" name="select" id="exampleSelect" onChange={this.changeDatasource} value={this.props.selectedDatasource || ''}>
                <option value="">Select...</option>
                  {Object.keys(this.props.datasources).map(key => {
                     return (
                      <option key={key} value={key}>{key}</option>
                    );
                  })}
              </Input>
            </Col>
          </FormGroup>
        </Form>);
    }
	}
  _WithDatasource.displayName = `WithDatasource(${getDisplayName(WrappedComponent)})`;

  _WithDatasource.propTypes = {
    elementId: PropTypes.string,
    datasources: PropTypes.object,
    selectedDatasource: PropTypes.string,
    setElementState: PropTypes.func	
  };

  _WithDatasource.defaultProps = {
    datasources:{},
    selectedDatasource:''
  }

  return _WithDatasource;
}

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const mapStateToProps = (state, props) => ({	
	datasources: state.app.datasources,
	selectedDatasource: state.app.elements[props.elementId].datasource
});

const mapDispatchToProps = dispatch => ({
	setElementState: (id, changes) => dispatch(setElementState(id, changes))	
});

WithDatasource.propTypes = {
	WrappedComponent: PropTypes.element	
};

const composedWithDatasource = compose(
	connect(mapStateToProps, mapDispatchToProps),
	WithDatasource
);

export default composedWithDatasource; 