import React from 'react';
import VerseCardVerseDisplay from './VerseCardVerseDisplay';
import VerseCardContent from './VerseCardContent';
import styled from '@emotion/styled';

const VerseCardBody = ({ scrollerRef }) => (
  <VerseCardBodyContainer>
    <VerseCardVerseDisplay />
    <VerseCardContent scrollerRef={scrollerRef} />
  </VerseCardBodyContainer>
);

const VerseCardBodyContainer = styled.div`
  position: relative;
  flex: 1;
`;

export default VerseCardBody;

