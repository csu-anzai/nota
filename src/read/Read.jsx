import React from 'react';
import { connect } from 'react-redux';
import DraggableVerseCard from './verseCard/DraggableVerseCard';
import CardContainer from '../shared/CardContainer';
import MoveableReadCard from './readCard/MoveableReadCard';

const Read = ({ verseId }) => (
  <>
    <CardContainer>
      <MoveableReadCard />
    </CardContainer>
    {verseId && (
      <CardContainer path="verse">
        <DraggableVerseCard verseId={verseId} />
      </CardContainer>
    )}
  </>
);

const mapStateToProps = state => ({
  verseId: state.location.payload.verseId
});

export default connect(mapStateToProps)(Read);
