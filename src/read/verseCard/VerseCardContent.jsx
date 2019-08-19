import React from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

const VerseCardContent = () => (
  <VerseCardContentContainer>
    <VerseCardContentWindow />
    <VerseCardContentTextContainer>
      Sup GGGGGG.
    </VerseCardContentTextContainer>
  </VerseCardContentContainer>
);

const VerseCardContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  overflow-y: auto;
`;

const VerseCardContentWindow = styled.div`
  height: 200px;
`;

const VerseCardContentTextContainer = styled.div`
  background-color: white;
  color: ${theme.text};
  padding: 16px;
  height: 4000px;
`;

export default VerseCardContent;
