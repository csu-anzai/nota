import React, { Component } from 'react';
import styled from '@emotion/styled';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { throttleTime, concatMap, takeUntil, map, withLatestFrom, tap, mapTo } from 'rxjs/operators';
import SubscriptionManager from './subscriptionManager';
import CappedArray from './cappedArray';

const FRICTION = .99;

const toTouchEvent = ({ touches }) => {
  const mainTouch = touches[0];

  const { screenX, screenY } = mainTouch;
  
  return { x: screenX, y: screenY };
};

const fromDragEvent = (dragEvent, dragStartEvent) => (dragEvent && dragStartEvent ? ({
  // which: dragEvent.which,
  x: dragEvent.x - dragStartEvent.x,
  y: dragEvent.y - dragStartEvent.y,
}) : {});

const getVelocity = (positions) => {
  console.log('posiitons', positions);
  let totalX = 0;
  let totalY = 0;

  for (let i = 0, { length } = positions; i < length; i += 0) {
    const { x, y } = positions[i];
    const factor = Math.pow(0.5, i);
    totalX +=  factor * x;
    totalY += factor * y;
  }

  return { x: totalX, y: totalY };
}

class DragCard extends Component {
  constructor(props) {
    super(props);

    // this.initialPosition = { x: 0, y: 0 };
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

    // const touchDrags$ = touchStart$.pipe(
    //   concatMap(touchStartEvent => touchMove$.pipe(
    //     takeUntil(touchEnd$),
    //     map(dragEvent => fromDragEvent(dragEvent, touchStartEvent)),
    //   )),
    // );
    
    // const lastEndingPosition$ = new BehaviorSubject(this.initialPosition);

    // let previousCurrentPositions = new CappedArray(5);

    // const currentPosition$ = touchDrags$.pipe(
    //   withLatestFrom(lastEndingPosition$),
    //   map(([ dragEvent, lastEndingPosition ]) => ({
    //     x: dragEvent.x + lastEndingPosition.x,
    //     y: dragEvent.y + lastEndingPosition.y,
    //   })),
    // );
    
    // const endingPosition$ = touchEnd$.pipe(
    //   withLatestFrom(currentPosition$),
    //   tap(() => console.log(previousCurrentPositions.get())),
    //   map(([, currentPosition]) => [currentPosition, getVelocity(previousCurrentPositions.get())]),
    // );

    // const endingVelocity$ = touchEnd$.pipe(
    //   mapTo(getVelocity(previousCurrentPositions.get())),
    // );    

    // endingVelocity$.subscribe(v => console.log('velocity', v));

    Object.assign(this.observables, {
      touchStart$,
      touchEnd$,
      touchMove$,
      // touchDrags$,
      // currentPosition$,
    });

    // const { touchStart$, touchEnd$, touchMove$ } = this.observables;

    this.subscriptions.add({
      touchStart: touchStart$.subscribe(this.touchStart),
      touchMove: touchMove$.subscribe(this.touchMove),
      touchEnd: touchEnd$.subscribe(this.touchEnd),
      // touchDrags: touchDrags$.subscribe(console.log),
      // currentPosition: currentPosition$.subscribe(this.updatePosition),
      // previousPositions: currentPosition$.subscribe(previousCurrentPositions.push),
      // // touchStart: touchStart$.subscribe(this.touchStart),
      // // touchMove: touchMove$.subscribe(this.touchMove),
      // endingPosition: endingPosition$.subscribe((position) => {
      //   lastEndingPosition$.next(position);
      // }),
    });
  }

  componentWillUnmount() {
    this.subscriptions.unsubscribe();
  }

  touchStart = (e) => {
    // console.log(e);
    const { current: card } = this.card;
    this.currentPosition = {
      x: parseInt(card.style.left || '0', 10),
      y: parseInt(card.style.top || '0', 10)
    };
    // console.log('start', this.currentPosition);
  }

  touchEnd = () => {
    this.lastTouchPosition = null;
    // const [deltaX, deltaY] = this.lastDelta;
    // const velocityX = deltaX;
    // const velocityY = deltaY;
    // console.log('end', velocityX, velocityY);
    // window.requestAnimationFrame(() => this.decay(velocityX, velocityY));
  }

  decay = (velocityX, velocityY, elapsedTime = 1) => {
    if (Math.abs(velocityX) < 0.01  || Math.abs(velocityY) < 0.01) return;

    const newVX = velocityX * FRICTION * (1 / elapsedTime);
    const newVY = velocityY * FRICTION * (1 / elapsedTime);
    this.move(newVX, newVY);

    window.requestAnimationFrame(() => this.decay(newVX, newVY, elapsedTime + (1 / 60)));
  }

  touchMove = (e) => {
    // const mainTouch = e.touches[0];
    const { x: screenX, y: screenY } = e;

    if (this.lastTouchPosition) {
      const { x, y } = this.lastTouchPosition;

      const deltaX = screenX - x;
      const deltaY = screenY - y;

      this.move({ deltaX, deltaY });
    }

    this.lastTouchPosition = { x: screenX, y: screenY };
  }

  move = ({ deltaX, deltaY }) => {
    const { x: currentX, y: currentY } = this.currentPosition;

    const x = currentX + deltaX;
    const y = currentY + deltaY;

    this.updatePosition({ x, y });
    this.deltas.push({ deltaX, deltaY });
    // this.lastDelta = [(this.lastDelta[0] * 2 + deltaX)/3, (this.lastDelta[1] * 2 + deltaY)/3];
    // console.log('move', deltaX, positionX, deltaY, positionY);
  }

  updatePosition = (pos) => {
    const { current: card } = this.card;
    card.style.top = `${pos.y}px`;
    card.style.left = `${pos.x}px`;
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
