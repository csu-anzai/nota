import React, { Component } from 'react';
import styled from '@emotion/styled';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import SubscriptionManager from './subscriptionManager';
import CappedArray from './cappedArray';
import easing from './easing';

const FRICTION = .99;

const FRAME = 1 / 60;

const BASICALLY_ZERO = 0.01;

const HOME_POINT = {
  x: 0,
  y: 0,
  gravity: 10,
};

const AWAY_POINT = {
  x: 1100,
  y: 0,
  gravity: 10,
};

const SLIDE_EFFECT = 10;

const APPROX_MAX_DIFFERENCE = 20;

const getWinningRestingPoint = (restingPoints, position, velocity) => {
  return restingPoints.reduce((target, restingPoint) => {
    const score = getRestingPointScore(restingPoint, position, velocity);
    if (score > target.score) return { score, restingPoint };

    return target;
  }, { score: 0, restingPoint: null });
}

const getRestingPointScore = ({ x, y, gravity }, {x: posX, y: posY }, { velocityX, velocityY}) =>
  gravity / ( Math.abs(x - (posX + velocityX * SLIDE_EFFECT)) + Math.abs(y - (posY + velocityY * SLIDE_EFFECT)) );

const toTouchEvent = (e) => {
  e.preventDefault();

  const mainTouch = e.touches[0];

  const { screenX, screenY } = mainTouch;
  
  return { x: screenX, y: screenY };
};

const getNextVelocity = (
  { velocityX, velocityY },
  { deltaX, deltaY },
  index
) => {
  const factor = (1 / (index + 1));

  return {
    velocityX: velocityX + (deltaX * factor),
    velocityY: velocityY + (deltaY * factor),
  }
};

const getVelocity = (deltas) => deltas.reduce(getNextVelocity, { velocityX: 0, velocityY: 0 });

const signsAreDifferent = (a, b) => a * b < 0;

const ANIMATION_TIME = .06

const clamp = (number, bottom, top) => {
  if (number > top) return top;
  if (number < bottom) return bottom;
  return number;
}

const getBezierHandle = ({ velocityX, velocityY }, { deltaX, deltaY }) => {
  const averageDelta = (deltaX + deltaY) / 2

  const averageVelocityForMove = averageDelta * ANIMATION_TIME;
  const averageVelocity = (velocityX + velocityY) / 2;

  const relativeMagnitudeOfVelocity = (Math.abs(averageVelocity) - Math.abs(averageVelocityForMove)) / APPROX_MAX_DIFFERENCE; // why 20?;
  const clampedRMV = clamp(relativeMagnitudeOfVelocity, -1, 1);

  let bezierA = -0.5 * clampedRMV + 0.5; // A = -(1/2)rmv + 0.5
  let bezierB = 0.5 * clampedRMV + 0.5; // B = (1/2)rmv + 0.5

  bezierA = clamp(bezierA, 0, 1); // prevent spilling outside logical range
  bezierB = clamp(bezierB, -1, 1); // prevent spilling outside logical range

  if (signsAreDifferent(averageVelocity, averageVelocityForMove)) { // if moving in the wrong direction
    bezierB *= -1; // flip B
  }

  console.log({
    bezierA,
    bezierB,
    averageDelta,
    relativeMagnitudeOfVelocity,
    averageVelocity,
    averageVelocityForMove,
  });

  return { bezierA, bezierB };
}

class DragCard extends Component {
  constructor(props) {
    super(props);

    this.currentPosition = { x: 0, y: 0 };
    this.lastTouchPosition = null;
    this.deltas = new CappedArray(3);

    this.restingPoints = [HOME_POINT, AWAY_POINT];

    this.observables = {};
    this.subscriptions = new SubscriptionManager();

    this.card = React.createRef();
  }

  componentDidMount() {
    const { current } = this.card || {};

    if (!current) return;

    const touchStart$ = fromEvent(current, 'touchstart').pipe(map(toTouchEvent));
    const touchEnd$ = fromEvent(current, 'touchend');
    const touchMove$ = fromEvent(current, 'touchmove').pipe(map(toTouchEvent));

    Object.assign(this.observables, {
      touchStart$,
      touchEnd$,
      touchMove$,
    });

    this.subscriptions.add({
      handleTouchStart: touchStart$.subscribe(this.handleTouchStart),
      handleTouchMove: touchMove$.subscribe(this.handleTouchMove),
      handleTouchEnd: touchEnd$.subscribe(this.handleTouchEnd),
    });
  }

  componentWillUnmount() {
    this.subscriptions.unsubscribe();
  }

  handleTouchStart = (e) => {
    this.card.current.style.transition = '';
  }

  handleTouchMove = (e) => {
    const { x: screenX, y: screenY } = e;

    if (this.lastTouchPosition) {
      const { x, y } = this.lastTouchPosition;

      const delta = {
        deltaX: screenX - x,
        deltaY: screenY - y,
      };

      this.move(delta);

      this.deltas.push(delta);
    }

    this.lastTouchPosition = { x: screenX, y: screenY };
  }

  handleTouchEnd = () => {
    const velocity = getVelocity(this.deltas.get());

    const { restingPoint } = getWinningRestingPoint(this.restingPoints, this.lastTouchPosition, velocity);

    const delta = { 
      deltaX: restingPoint.x - this.lastTouchPosition.x,
      deltaY: restingPoint.y - this.lastTouchPosition.y,
    };

    const { bezierA, bezierB } = getBezierHandle(velocity, delta);

    this.card.current.style.transition = `transform 0.6s cubic-bezier(${bezierA}, ${bezierB}, 0.5, 1)`;

    this.deltas.clear();
    this.lastTouchPosition = null;

    this.updatePosition({ x: restingPoint.x, y: restingPoint.y });
  }

  move = ({ deltaX, deltaY }) => {
    const { x: currentX, y: currentY } = this.currentPosition;

    const x = currentX + deltaX;
    const y = currentY + deltaY;

    this.updatePosition({ x, y });
  }

  updatePosition = (pos) => {
    const { current: { style } } = this.card;

    style.transform = `translate(${pos.x}px, ${pos.y}px)`;

    this.currentPosition = pos;
  }

  render() {
    const { children } = this.props;

    return (
      <Card ref={this.card}>
        {children}
      </Card>
    ) 
  }
}

const Card = styled.div`
  width: 100px;
  height: 100px;
  background: red;
  position: absolute;
`;

export default DragCard;
