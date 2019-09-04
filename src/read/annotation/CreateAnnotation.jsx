import React from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { Button } from '../../shared/Html';
import { store } from '../..';
import routes from '../../shared/constants/routes';

const CreateAnnotation = () => (
  <CreateAnnotationContainer>
    <Button
      type="button"
      onClick={() => store.dispatch(routes.readVerse.action())}
    >
      Close
    </Button>
  </CreateAnnotationContainer>
);

const CreateAnnotationContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${theme.blank};
`;

export default CreateAnnotation;
