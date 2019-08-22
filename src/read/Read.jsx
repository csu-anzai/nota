import React from 'react';
import DraggableVerseCard from './verseCard/DraggableVerseCard';
import CardContainer from '../shared/CardContainer';

const Read = () => (
  <>
    <CardContainer path="verse">
      <DraggableVerseCard />
    </CardContainer>
  </>
);

export default Read;
