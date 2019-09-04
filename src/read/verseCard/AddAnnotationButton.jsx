import React, { Component } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Button } from '../../shared/Html';
import Icon, { ICONS } from '../../shared/Icon';
import theme from '../../styles/theme';
import routes from '../../shared/constants/routes';

class AddAnnotationButton extends Component {
  // state = {}
  state = {
    hide: false,
  }

  componentDidMount() {
    this.appearTimeout = setTimeout(() => this.setState({ hide: true }), 300);
  }
  
  componentDidUpdate(props) {
    const { hide } = this.props;
    const { hide: previousHide } = this.state;

    if (hide !== previousHide) {
      this.setState({ hide });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.appearTimeout)
  }
  
  render() {
    const { createAnnotationAction } = this.props;
    const { hide } = this.state;

    return (
      <AddAnnotationButtonContainer>
        <AddAnnotationStyledButton
          type="button"
          onClick={() => createAnnotationAction()}
          className={hide ? 'hide' : undefined}
        >
          <Icon icon={ICONS.EDIT} size={18} />
          Add annotation
        </AddAnnotationStyledButton>
      </AddAnnotationButtonContainer>
    );
  }
}

const AddAnnotationButtonContainer = styled.div`
  position: fixed;
  top: 75%;
  width: 100%;
  z-index: 4;
  text-align: center;
`;

const AddAnnotationStyledButton = styled(Button)`
  border-radius: 50px;
  text-align: center;
  background-color: ${theme.secondary};
  padding: 12px 20px;
  font-size: 18px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.25);
  font-style: italic;
  transition: transform .3s ease-in-out;

  svg {
    margin: -4px 6px 0 -4px;
  }

  &.hide {
    transform: translateY(120px);
  }
`;

export default connect(null, { createAnnotationAction: routes.createAnnotation.action })(AddAnnotationButton);
