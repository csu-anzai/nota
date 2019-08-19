import React from 'react';
import theme from '../../styles/theme';
import styled from '@emotion/styled';
import VerseCardHeader from './VerseCardHeader';
// import { FULL } from './restingPoints';

const VerseCard = ({
  draggableRef,
  handleClick,
  iconRef,
  // currentRestingPoint = FULL,
}) => (
  <VerseCardDiv ref={draggableRef}>
    <VerseCardHeader
      iconRef={iconRef}
      handleClick={handleClick}
    />
  </VerseCardDiv>
);

const VerseCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 120vh;
  border-radius: 12px;
  position: absolute;
  background: ${theme.primary};
  color: ${theme.textOnPrimary};
  pointer-events: all;
`;

export default VerseCard;
