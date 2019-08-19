import React from 'react';
import VerseCardVerseDisplay from './VerseCardVerseDisplay';
import VerseCardContent from './VerseCardContent';
import styled from '@emotion/styled';

const VerseCardBody = () => (
  <VerseCardBodyContainer>
    <VerseCardVerseDisplay />
    <VerseCardContent />
  </VerseCardBodyContainer>
);

const VerseCardBodyContainer = styled.div`
  position: relative;
  flex: 1;
`;

export default VerseCardBody;

