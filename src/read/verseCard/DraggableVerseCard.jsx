import React, { Component } from 'react';
import styled from '@emotion/styled';
import Draggable, { AXIS } from '../../shared/Draggable';
import ResizeHook from '../../shared/ResizeHook';
import { FULL, COLLAPSED, HIDDEN, getAwayPosition } from './restingPoints';
import { ANIMATION_DURATION } from './constants';
import VerseCard from './VerseCard';

const getValidRestingPoints = current => current.id === 2 ? [FULL, COLLAPSED, HIDDEN] : [FULL, COLLAPSED]

class DraggableVerseCard extends Component {
  constructor(props) {
    super(props);

    this.iconRef = React.createRef();
    
    this.currentRestingPoint = FULL;

    this.state = {
      restingPoints: getValidRestingPoints(this.currentRestingPoint),
    }
  }

  getRestingPoint = (id) => {
    const { restingPoints } = this.state;
    return restingPoints.find(rp => rp.id === id);
  }

  setIconStyle = ({ id }) => {
    const { current } = this.iconRef;

    if (!current) return;

    if (id === 1) {
      current.style.transform = "rotate(0deg)";
    } else {
      current.style.transform = "rotate(180deg)";
    }
  }

  setCurrentRestingPoint = (id) => {
    this.currentRestingPoint = this.getRestingPoint(id);

    this.setIconStyle(this.currentRestingPoint);

    this.setState({
      restingPoints: getValidRestingPoints(this.currentRestingPoint),
    });
  }

  handleAnimateTo = ({ point: { restingPoint }}) => {
    if (!restingPoint) return;
    
    const { id } = restingPoint;

    this.setCurrentRestingPoint(id);
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
        animationDuration={ANIMATION_DURATION}
        onAnimateTo={this.handleAnimateTo}
      >
        {({ draggableRef, animateTo, animateToClosestRestingPoint }) => (
          <>
            <ButtonPrimary
              onClick={() => this.handleClick(animateTo, draggableRef)}
              type="button"
              style={{ position: 'absolute', top: 8, right: 8 }}
            >
              Toggle
            </ButtonPrimary>
            <ResizeHook onResize={() => animateToClosestRestingPoint()} />
            <VerseCard
              draggableRef={draggableRef}
              iconRef={this.iconRef}
              handleClick={() => this.handleClick(animateTo, draggableRef)}
            />
          </>
        )}
      </Draggable>
    )
  };
}

const ButtonPrimary = styled.button`
  padding: 8px 12px;
  min-width: 80px;
  background-color: #8050C7;
  color: white;
  border-radius: 4px;
`;

export default DraggableVerseCard;
