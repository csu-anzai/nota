import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import routes from '../../shared/constants/routes';
import CreateAnnotation from './CreateAnnotation';

const CreateAnnotationMounter = ({ locationType }) => (
  <CSSTransition
    in={locationType === routes.createAnnotation.type}
    timeout={200}
    classNames="fadeUp"
    unmountOnExit
  >
    <CreateAnnotation />
  </CSSTransition>
);

const mapStateToProps = state => ({
  locationType: state.location.type,  
});

export default connect(mapStateToProps)(CreateAnnotationMounter);
