import React from 'react';
import theme from '../../styles/theme';
import styled from '@emotion/styled';
import VerseCardHeader from './VerseCardHeader';
import VerseCardBody from './VerseCardBody';
// import { FULL } from './restingPoints';

const VerseCard = ({
  verse,
  draggableRef,
  handleClick,
  iconRef,
  scrollerRef,
  currentRestingPoint,
}) => (
  <VerseCardDiv ref={draggableRef} currentRestingPoint={currentRestingPoint}>
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

const VerseCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 120vh;
  position: absolute;
  background: ${theme.primary};
  color: ${theme.textOnPrimary};
  pointer-events: all;
  border-radius: 12px;
  /* TODO: Make a better strategy here */
  transition: box-shadow 1000ms ease-out;
  box-shadow: ${({ currentRestingPoint }) => currentRestingPoint.id === 1 ? `0px 0px 0px 12px ${theme.primary}` : `none`}; 
  top: 100%;
`;

export default VerseCard;
