import React, { Component } from 'react';
import styled from '@emotion/styled';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import SubscriptionManager from './subscriptionManager';
import CappedArray from './cappedArray';

const HOME_POINT = {
  position: 0,
  gravity: 10,
};

const AWAY_POINT = {
  position: 500,
  gravity: 10,
};

const SLIDE_EFFECT = 10;

const APPROX_MAX_DIFFERENCE = 20;

const getWinningRestingPoint = (restingPoints, position, velocity) => restingPoints
  .reduce((target, restingPoint) => {
    const score = getRestingPointScore(restingPoint, position, velocity);
    if (score > target.score) return { score, restingPoint };

    return target;
  }, { score: 0, restingPoint: null })
  .restingPoint;

const getRestingPointScore = ({ position: restingPointPosition, gravity }, position, velocity) =>
  gravity / Math.abs(restingPointPosition - (position + velocity * SLIDE_EFFECT));

const toTouchEvent = (e) => {
  e.preventDefault();

  const mainTouch = e.touches[0];

  const { screenX, screenY } = mainTouch;
  
  return { x: screenX, y: screenY };
};

const getNextVelocity = (
  velocity,
  delta,
  index
) => {
  const factor = (1 / (index + 1));

  return velocity + (delta * factor);
};

const getVelocity = (deltas) => deltas.reduce(getNextVelocity, 0);

const signsAreDifferent = (a, b) => a * b < 0;

const ANIMATION_TIME = .06

const clamp = (number, bottom, top) => {
  if (number > top) return top;
  if (number < bottom) return bottom;
  return number;
}

const getBezierHandle = (velocity, delta) => {
  const averageVelocityForMove = delta * ANIMATION_TIME;

  const relativeMagnitudeOfVelocity = (Math.abs(velocity) - Math.abs(averageVelocityForMove)) / APPROX_MAX_DIFFERENCE; // why 20?;
  const clampedRMV = clamp(relativeMagnitudeOfVelocity, -1, 1);

  let bezierA = -0.5 * clampedRMV + 0.5; // A = -(1/2)rmv + 0.5
  let bezierB = 0.5 * clampedRMV + 0.5; // B = (1/2)rmv + 0.5

  bezierA = clamp(bezierA, 0, 1); // prevent spilling outside logical range
  bezierB = clamp(bezierB, -1, 1); // prevent spilling outside logical range

  if (signsAreDifferent(velocity, averageVelocityForMove)) { // if moving in the wrong direction
    bezierB *= -1; // flip B
  }

  console.log({
    bezierA,
    bezierB,
    delta,
    relativeMagnitudeOfVelocity,
    velocity,
    averageVelocityForMove,
  });

  return { bezierA, bezierB };
}

class DragCard extends Component {
  constructor(props) {
    super(props);

    this.axis = props.axis || 'y';

    this.currentPosition = 0;
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
    const touchPosition = e[this.axis];

    if (this.lastTouchPosition) {
      const delta = touchPosition - this.lastTouchPosition;

      this.move(delta);

      this.deltas.push(delta);
    }

    this.lastTouchPosition = touchPosition;
  }

  handleTouchEnd = () => {
    const velocity = getVelocity(this.deltas.get());

    const restingPoint = getWinningRestingPoint(this.restingPoints, this.lastTouchPosition, velocity);
    if (!restingPoint) return;

    const { position: restingPointPosition } = restingPoint;

    const delta = restingPointPosition - this.lastTouchPosition;

    const { bezierA, bezierB } = getBezierHandle(velocity, delta);

    this.card.current.style.transition = `transform 0.6s cubic-bezier(${bezierA}, ${bezierB}, 0.5, 1)`;

    this.deltas.clear();
    this.lastTouchPosition = null;

    this.updatePosition(restingPointPosition);
  }

  move = (delta) => {
    this.updatePosition(this.currentPosition + delta);
  }

  updatePosition = (pos) => {
    const { current: { style } } = this.card;

    style.transform = `translate${this.axis.toUpperCase()}(${pos}px)`;

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
