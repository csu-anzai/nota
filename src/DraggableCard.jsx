import React, { Component } from 'react';
import Draggable, { AXIS } from './Draggable';
import styled from '@emotion/styled';
import ResizeHook from './ResizeHook';

const getAwayPosition = (el) => el.parentElement.clientHeight - 100;

const HOME_POINT = {
  id: 1,
  position: 0,
  gravity: 10,
};

const AWAY_POINT = {
  id: 2,
  getPosition: getAwayPosition,
  gravity: 10,
};

class DraggableCard extends Component {
  constructor(props) {
    super(props);

    this.restingPoints = [HOME_POINT, AWAY_POINT];
    this.currentRestingPoint = this.restingPoints[0];
  }
  
  state = {
    currentRestingPoint: HOME_POINT,
  }

  getRestingPointFromId = () => {
    this.restingPoints.find(({ }))
  }

  handleAnimateTo = ({ point }) => {
    if (!point) return;
    console.log(point);
    const { id } = point.restingPoint;

    this.currentRestingPoint = this.restingPoints.find(rp => rp.id === id);
    console.log(this.currentRestingPoint);
  }

  handleClick = (animateTo, draggableRef) => {
    console.log(this.currentRestingPoint);
    const { id: restingPointId } = this.currentRestingPoint;
    if (restingPointId === HOME_POINT.id) animateTo({ position: getAwayPosition(draggableRef.current), restingPoint: AWAY_POINT });
    else animateTo({ position: HOME_POINT.position, restingPoint: HOME_POINT });
  }
  
  render() {
    return (
      <Draggable
        restingPoints={this.restingPoints}
        axis={AXIS.Y}
        animationDuration={600}
        onAnimateTo={this.handleAnimateTo}
      >
        {({ draggableRef, animateTo, animateToClosestRestingPoint }) => (
          <>
            <button
              onClick={() => this.handleClick(animateTo, draggableRef)}
              type="button"
              style={{ position: 'absolute', top: 0, right: 0 }}
            >
              Hi
            </button>
            <ResizeHook onResize={() => animateToClosestRestingPoint()} />
            <Card ref={draggableRef}></Card>
          </>
        )}
      </Draggable>
    )
  };
}

const Card = styled.div`
  width: 100px;
  height: 100px;
  background: red;
  position: absolute;
`;

export default DraggableCard;
