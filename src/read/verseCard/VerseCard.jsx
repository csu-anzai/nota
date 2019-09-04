import React from 'react';
import { connect } from 'react-redux';
import theme from '../../styles/theme';
import styled from '@emotion/styled';
import VerseCardHeader from './VerseCardHeader';
import VerseCardBody from './VerseCardBody';
import { getVerse } from '../../shared/helpers/bookHelpers';
import AddAnnotationButton from './AddAnnotationButton';

const VerseCard = ({
  payload,
  draggableRef,
  handleClick,
  iconRef,
  scrollerRef,
  currentRestingPoint,
  showAddButton,
}) => {
  const verse = getVerse(payload);
  
  return (
    <VerseCardDiv ref={draggableRef} currentRestingPoint={currentRestingPoint}>
      <AddAnnotationButton hide={!showAddButton} />      
      <VerseCardHeader
        verse={verse}
        iconRef={iconRef}
        handleClick={handleClick}
      />
      <VerseCardBody
        verse={verse}
        scrollerRef={scrollerRef}
      />
    </VerseCardDiv>
  );
};

const VerseCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 120%;
  position: absolute;
  background: ${theme.primary};
  color: ${theme.textOnPrimary};
  pointer-events: all;
  border-radius: 12px;
  /* TODO: Make a better strategy here */
  transition: box-shadow 1000ms ease-out;
  box-shadow: ${({ currentRestingPoint }) => currentRestingPoint.id === 1 ? `0px 0px 0px 12px ${theme.primary}` : `none`}; 
`;

const mapStateToProps = state => ({
  payload: state.location.payload,
});

export default connect(mapStateToProps)(VerseCard);
