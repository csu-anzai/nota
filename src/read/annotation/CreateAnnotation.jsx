import React, { Component } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { Button } from '../../shared/Html';
import { store } from '../..';
import routes from '../../shared/constants/routes';
import * as Annotations from './Annotations';
import AnnotationEditor from './AnnotationEditor';
import Icon, { ICONS } from '../../shared/Icon';

class CreateAnnotation extends Component {
  state = {
    text: '',
  }

  handleChange = (text) => {
    this.setState({ text });
  }

  handleSave = () => {
    const { text } = this.state;
    
    Annotations.create({ text })
      .then((coo) => {
        console.log('wow', coo);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
  
  render() {
    const { text } = this.state;
    
    return (
      <CreateAnnotationContainer>
        <CreateAnnotationButtonRow>
          <Button
            type="button"
            onClick={() => store.dispatch(routes.readVerse.action())}
            className="editorDiscard"
          >
            <Icon icon={ICONS.ANGLE_LEFT} />Discard
          </Button>
          <Button
            type="button"
            onClick={this.handleSave}
            className="editorSave"
          >
            <Icon icon={ICONS.CHECK} />Save
          </Button>
        </CreateAnnotationButtonRow>
        <AnnotationEditor
          text={text}
          handleChange={this.handleChange}
        />
      </CreateAnnotationContainer>
    );
  }
}

const CreateAnnotationContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${theme.blank};

  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  min-height: 0;
`;

const CreateAnnotationButtonRow = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    padding: 16px;
    font-weight: 500;
  }

  .editorDiscard {
    color: ${theme.textLight};
  }

  .editorSave {
    color: ${theme.primary};
  }
`;

export default CreateAnnotation;
