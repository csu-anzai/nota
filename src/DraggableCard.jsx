import React from 'react';
import Draggable, { AXIS } from './Draggable';
import styled from '@emotion/styled';

const HOME_POINT = {
  position: 0,
  gravity: 10,
};

const AWAY_POINT = {
  getPosition: (el) => el.parentElement.clientHeight - 100,
  gravity: 10,
};

const DraggableCard = () => {
  return (
    <Draggable
      restingPoints={[HOME_POINT, AWAY_POINT]}
      axis={AXIS.Y}
      animationDuration={600}
    >
      {({ draggableRef }) => (
        <Card ref={draggableRef}></Card>
      )}
    </Draggable>
  )
};

const Card = styled.div`
  width: 100px;
  height: 100px;
  background: red;
  position: absolute;
`;

export default DraggableCard;
