import React, { Component } from 'react';
import styled from '@emotion/styled';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import SubscriptionManager from './subscriptionManager';
import CappedArray from './cappedArray';

const FRICTION = .99;

const FRAME = 1 / 60;

const BASICALLY_ZERO = 0.01;

const toTouchEvent = ({ touches }) => {
  const mainTouch = touches[0];

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
    const { current: { style } } = this.card;

    this.currentPosition = {
      x: safelyGetNumber(style.left),
      y: safelyGetNumber(style.top),
    };
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
    this.lastTouchPosition = null;

    const velocity = getVelocity(this.deltas.get());

    this.deltas.clear();

    window.requestAnimationFrame(() => this.decay(velocity));
  }

  move = ({ deltaX, deltaY }) => {
    const { x: currentX, y: currentY } = this.currentPosition;

    const x = currentX + deltaX;
    const y = currentY + deltaY;

    this.updatePosition({ x, y });
  }

  updatePosition = (pos) => {
    const { current: { style } } = this.card;

    style.top = `${pos.y}px`;
    style.left = `${pos.x}px`;

    this.currentPosition = pos;
  }

  decay = ({ velocityX, velocityY }, elapsedTime = 1) => {
    if (Math.abs(velocityX) < BASICALLY_ZERO || Math.abs(velocityY) < BASICALLY_ZERO) return;

    const factor = FRICTION * (1 / elapsedTime);

    const newVX = velocityX * factor;
    const newVY = velocityY * factor;

    this.move({ deltaX: newVX, deltaY: newVY });

    window.requestAnimationFrame(() => this.decay({ velocityX: newVX, velocityY: newVY }, elapsedTime + FRAME));
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
