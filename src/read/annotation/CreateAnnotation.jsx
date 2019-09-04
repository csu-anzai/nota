import React, { Component } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { Button } from '../../shared/Html';
import { store } from '../..';
import routes from '../../shared/constants/routes';
import * as Annotations from './Annotations';

class CreateAnnotation extends Component {
  state = {
    text: '',
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
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
        <Button
          type="button"
          onClick={() => store.dispatch(routes.readVerse.action())}
        >
          Close
        </Button>
        <div>
          <input
            onChange={this.handleChange}
            name="annotationText"
            value={text}
            style={{ border: '1px solid grey', padding: 4 }}
          />
        </div>
        <Button
          type="button"
          onClick={this.handleSave}
        >
          Save
        </Button>
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
`;

export default CreateAnnotation;
