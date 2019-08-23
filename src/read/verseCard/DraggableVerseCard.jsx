import React, { Component } from 'react';
import styled from '@emotion/styled';
import Draggable, { AXIS, DIRECTION } from '../../shared/Draggable';
import ResizeHook from '../../shared/ResizeHook';
import { FULL, COLLAPSED, HIDDEN, getAwayPosition } from './restingPoints';
import { ANIMATION_DURATION, verse } from './constants';
import VerseCard from './VerseCard';

const { UP } = DIRECTION;

const getValidRestingPoints = current => current.id === 2 ? [FULL, COLLAPSED, HIDDEN] : [FULL, COLLAPSED]

class DraggableVerseCard extends Component {
  constructor(props) {
    super(props);

    this.iconRef = React.createRef();

    this.scrollerRef = React.createRef();
    
    this.state = {
      restingPoints: getValidRestingPoints(HIDDEN),
      currentRestingPoint: HIDDEN,
    }
  }

  // componentDidUpdate(prevProps) {
  //   const { verseId } = this.props;
  //   const { verseId: prevVerseId } = prevProps;

  //   if (!prevVerseId && verseId) 
  // }

  initDraggable = (ref) => {
    console.log(ref);
    const { restingPoints } = this.state;
    
    this.draggable = new Draggable({
      axis: AXIS.Y,
      restingPoints,
      animationDuration: ANIMATION_DURATION,
      onAnimateTo: this.handleAnimateTo,
      getIsMoveable: this.isMoveable,
      ref,
    });

    console.log(this.draggable);
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
      current.style.transform = "rotate(-180deg)";
    }
  }

  setCurrentRestingPoint = (id) => {
    const currentRestingPoint = this.getRestingPoint(id);

    this.setIconStyle(currentRestingPoint);

    const newRestingPoints = getValidRestingPoints(currentRestingPoint)

    this.setState({
      currentRestingPoint,
      restingPoints: newRestingPoints,
    });

    this.draggable.setRestingPoints(newRestingPoints);
  }

  handleAnimateTo = ({ point: { restingPoint }}) => {
    console.log(restingPoint);
    
    if (!restingPoint) return;
    
    const { id } = restingPoint;

    this.setCurrentRestingPoint(id);
  }

  handleClick = () => {
    const { currentRestingPoint } = this.state;
    const { id: restingPointId } = currentRestingPoint || {};

    if (restingPointId === COLLAPSED.id) {
      this.draggable.animateTo({
        position: FULL.position,
        restingPoint: FULL,
      });
    } else {
      this.draggable.animateTo({
        position: getAwayPosition(this.draggable.ref),
        restingPoint: COLLAPSED,
      });
    }
  }

  isMoveable = ({ event, direction }) => {
    if (event.target.classList.contains('draggable')) return true;
    
    const { current } = this.scrollerRef;
    if (!current) return true;

    const { currentRestingPoint } = this.state;
    if (currentRestingPoint.id !== 1) return true;

    const scrollerIsAtTop = current.scrollTop < 1;

    if (direction === UP || !scrollerIsAtTop) return false;

    return true;
  }

  onResize = () => {
    this.draggable.animateToClosestRestingPoint();
  }

  render() {
    const { currentRestingPoint } = this.state;

    return (
      <>
        {/* <ButtonPrimary
          onClick={() => this.handleClick(animateTo, draggableRef)}
          type="button"
          style={{ position: 'absolute', top: 8, right: 8 }}
        >
          Toggle
        </ButtonPrimary> */}
        <ResizeHook onResize={this.onResize} />
        <VerseCard
          draggableRef={this.initDraggable}
          scrollerRef={this.scrollerRef}
          iconRef={this.iconRef}
          handleClick={this.handleClick}
          verse={verse}
          currentRestingPoint={currentRestingPoint}
        />
      </>
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
