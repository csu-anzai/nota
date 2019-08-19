import React, { Component } from 'react';
import Draggable, { AXIS } from './Draggable';
import styled from '@emotion/styled';
import ResizeHook from './ResizeHook';
import Icon, { ICONS } from './Icon';

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

const ANIMATION_DURATION = 600;

const iconStyle = { transition: `transform ${ANIMATION_DURATION}ms ease-in-out`};

const getValidRestingPoints = current => current.id === 2 ? [FULL, COLLAPSED, HIDDEN] : [FULL, COLLAPSED]

class DraggableCard extends Component {
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
            <Card ref={draggableRef} onClick={() => this.handleClick(animateTo, draggableRef)}>
              <Icon
                icon={ICONS.ANGLE_DOWN}
                svgRef={this.iconRef}
                style={iconStyle}
                size={24}
              />
            </Card>
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

const Card = styled.div`
  width: 100%;
  height: 2000px;
  padding: 8px;
  background: #8050C7;
  border-radius: 12px;
  position: absolute;
  color: white;
`;

export default DraggableCard;
