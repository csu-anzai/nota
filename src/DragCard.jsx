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
  x: 700,
  y: 0,
  gravity: 10,
};

const getPolynomialOfT = (a, b, initialVelocity) => (time) =>
  (1/3 * a * Math.pow(time, 3)) + (1/2 * b * Math.pow(time, 2)) + (initialVelocity * time);

const a = (duration, distance, initialVelocity) =>
  3 * (initialVelocity / Math.pow(duration, 2)) - (6 * distance / Math.pow(duration, 3));

const b = (duration, distance, initialVelocity) =>
  (6 * distance / Math.pow(duration, 2)) - (4 * initialVelocity / duration);

const getDistanceEquation = (duration, distance, initialVelocity) => {
  const thisA = a(duration, distance, initialVelocity);
  const thisB = b(duration, distance, initialVelocity);

  return getPolynomialOfT(thisA, thisB, initialVelocity);
};

const getWinningRestingPoint = (restingPoints, position) => {
  return restingPoints.reduce((target, restingPoint) => {
    const score = getRestingPointScore(restingPoint, position);
    if (score > target.score) return { score, restingPoint };

    return target;
  }, { score: 0, restingPoint: null });
}

const getRestingPointScore = ({ x, y, gravity }, {x: posX, y: posY }) => gravity / ( Math.abs(x - posX) + Math.abs(y - posY) );

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

const safelyGetNumber = str => parseInt(str || '0', 10);

const getVelocity = (deltas) => deltas.reduce(getNextVelocity, { velocityX: 0, velocityY: 0 });

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

  getCurrentTopLeftPosition = () => {
    const { current: { style } } = this.card;

    return {
      x: safelyGetNumber(style.left),
      y: safelyGetNumber(style.top),
    };
  }

  handleTouchStart = (e) => {
    this.currentPosition = this.getCurrentTopLeftPosition();
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
    const { restingPoint } = getWinningRestingPoint(this.restingPoints, this.lastTouchPosition);

    // const velocity = getVelocity(this.deltas.get());

    const delta = { 
      deltaX: restingPoint.x - this.lastTouchPosition.x,
      deltaY: restingPoint.y - this.lastTouchPosition.y,
    };

    const distanceEquationX = getDistanceEquation(100, delta.deltaX, this.deltas.getLatest().deltaX);
    const distanceEquationY = getDistanceEquation(100, delta.deltaY, this.deltas.getLatest().deltaY);

    console.log({
      restingPoint,
      lastTouchPosition: this.lastTouchPosition,
      delta,
      v: this.deltas.getLatest(),
    });

    const initialPosition = this.getCurrentTopLeftPosition();
  

    window.requestAnimationFrame(() => this.doStuff(distanceEquationX, distanceEquationY, initialPosition, 0, 100));

    // window.requestAnimationFrame(() => this.ease(0, this.lastTouchPosition, delta, 120))



    this.deltas.clear();
    this.lastTouchPosition = null;

    // window.requestAnimationFrame(() => this.decay(velocity));
  }

  doStuff = (distanceEquationX, distanceEquationY, initialPosition, elapsedTime, duration) => {
    if (elapsedTime > duration) {
      console.log('finalPos', this.currentPosition);
      return;
    }

    const newPos = {
      x: initialPosition.x + distanceEquationX(elapsedTime),
      y: initialPosition.y + distanceEquationY(elapsedTime),
    };
    // console.log(newPos);
    this.updatePosition(newPos);

    window.requestAnimationFrame(() => this.doStuff(distanceEquationX, distanceEquationY, initialPosition, elapsedTime + 1, duration));
  }

  ease = (timeElapsed, startingPosition, requiredChange, durationInFrames) => {
    if (timeElapsed >= durationInFrames) {
      this.lastTouchPosition = null;
      return;
    }

    const newPosition = {
      x: easing.quart.easeInOut(timeElapsed, startingPosition.x, requiredChange.deltaX, durationInFrames),
      y: easing.quart.easeInOut(timeElapsed, startingPosition.y, requiredChange.deltaY, durationInFrames)
    };

    // console.log('newPosition', newPosition, startingPosition.x + requiredChange.deltaX);

    this.updatePosition(newPosition);

    window.requestAnimationFrame(() => this.ease(timeElapsed + 1, startingPosition, requiredChange, durationInFrames));
  } 

  move = ({ deltaX, deltaY }) => {
    const { x: currentX, y: currentY } = this.currentPosition;

    const x = currentX + deltaX;
    const y = currentY + deltaY;

    this.updatePosition({ x, y });
  }

  updatePosition = (pos) => {
    const { current: { style } } = this.card;

    // style.top = `${pos.y}px`;
    style.left = `${pos.x}px`;

    this.currentPosition = pos;
  }

  // decay = ({ velocityX, velocityY }, elapsedTime = 1) => {
  //   if (Math.abs(velocityX) < BASICALLY_ZERO || Math.abs(velocityY) < BASICALLY_ZERO) return;

  //   const factor = FRICTION * (1 / elapsedTime);

  //   const newVX = velocityX * factor;
  //   const newVY = velocityY * factor;

  //   this.move({ deltaX: newVX, deltaY: newVY });

  //   window.requestAnimationFrame(() => this.decay({ velocityX: newVX, velocityY: newVY }, elapsedTime + FRAME));
  // }

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
