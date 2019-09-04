import React from 'react';
import { connect } from 'react-redux';
import DraggableVerseCard from './verseCard/DraggableVerseCard';
import CardContainer from '../shared/CardContainer';
import MoveableReadCard from './readCard/MoveableReadCard';
import CreateAnnotationMounter from './annotation/CreateAnnotationMounter';

const Read = ({ verseId, locationType }) => (
  <>
    <CardContainer>
      <MoveableReadCard />
    </CardContainer>
    {verseId && (
      <CardContainer path="verse">
        <DraggableVerseCard verseId={verseId} />
      </CardContainer>
    )}
    <CreateAnnotationMounter />
  </>
);

const mapStateToProps = state => ({
  verseId: state.location.payload.verseId,
});

export default connect(mapStateToProps)(Read);
