import React, { Component } from 'react';
import Draggable, { AXIS } from './Draggable';
import styled from '@emotion/styled';
import ResizeHook from './ResizeHook';

const getAwayPosition = (el) => el.parentElement.clientHeight - 40;

const FULL = {
  id: 1,
  position: 0,
  gravity: 10,
};

const COLLAPSED = {
  id: 2,
  getPosition: getAwayPosition,
  gravity: 10,
};

const HIDDEN = {
  id: 3,
  getPosition: () => window.document.body.clientHeight,
  gravity: 10,
};

const getValidRestingPoints = current => current.id === 2 ? [FULL, COLLAPSED, HIDDEN] : [FULL, COLLAPSED]

class DraggableCard extends Component {
  constructor(props) {
    super(props);

    this.currentRestingPoint = FULL;

    this.state = {
      restingPoints: getValidRestingPoints(this.currentRestingPoint),
    }
  }

  getResintPoint = (id) => {
    const { restingPoints } = this.state;
    return restingPoints.find(rp => rp.id === id);
  }

  handleAnimateTo = ({ point: { restingPoint }}) => {
    if (!restingPoint) return;
    
    const { id } = restingPoint;

    this.currentRestingPoint = this.getRestingPoint(id);

    this.setState({
      restingPoints: getValidRestingPoints(this.currentRestingPoint),
    });
  }

  handleClick = (animateTo, draggableRef) => {
    const { id: restingPointId } = this.currentRestingPoint || {};

    if (restingPointId === COLLAPSED.id) {
      animateTo({
        position: FULL.position,
        restingPoint: FULL,
      });
    } else {
      animateTo({
        position: getAwayPosition(draggableRef.current),
        restingPoint: COLLAPSED,
      });
    }
  }
  
  render() {
    const { restingPoints } = this.state;

    return (
      <Draggable
        restingPoints={restingPoints}
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
            <Card ref={draggableRef} onClick={() => this.handleClick(animateTo, draggableRef)}></Card>
          </>
        )}
      </Draggable>
    )
  };
}

const Card = styled.div`
  width: 100%;
  height: 4000px;
  background: darkgray;
  border-radius: 12px;
  position: absolute;
`;

export default DraggableCard;
