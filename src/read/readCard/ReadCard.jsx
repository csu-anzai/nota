import React from 'react';
import styled from '@emotion/styled';
import ReadCardChapter from './ReadCardChapter';

const ReadCard = () => (
  <ContentCardContainer>
    <ReadCardChapter />
  </ContentCardContainer>
);

const ContentCardContainer = styled.div`
  padding: 16px;
  margin-bottom: 100px;
`;

export default ReadCard;
