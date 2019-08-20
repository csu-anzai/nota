import React, { Component } from 'react';
import CappedArray from './helpers/cappedArray';
import SubscriptionManager from './helpers/subscriptionManager';
import { getVelocity, getWinningRestingPoint, getBezierHandle, toTouchEvent } from './helpers/draggableHelpers';
import { fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { safelyCall } from './helpers/helpers';

export const AXIS = {
  X: 'x',
  Y: 'y',
};

export const DIRECTION = {
  UP: 'up',
  DOWN: 'down',
};

const { UP, DOWN } = DIRECTION;

const DEFAULT_AXIS = AXIS.Y;
const DEFAULT_STARTING_POSITION = 0;
const DEFAULT_ANIMATION_MS = 600;
const DEFAULT_SLIDE_EFFECT = 15; 

class Draggable extends Component {
  constructor(props) {
    super(props);

    const {
      axis = DEFAULT_AXIS,
      startingPosition = DEFAULT_STARTING_POSITION,
    } = props;
    
    this.axis = axis;
    this.currentPosition = startingPosition;
    
    this.lastTouchPosition = null;
    this.deltas = new CappedArray(3);

    this.observables = null;
    this.subscriptions = null;

    this.draggableRef = React.createRef();
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    this.init();
  }

  componentWillUnmount() {
    if (!this.subscriptions) return;
    
    this.subscriptions.unsubscribe();
  }

  init = () => {
    if (this.observables || this.subscriptions) return;

    const { current } = this.draggableRef || {};

    if (!current) return;

    const touchStart$ = fromEvent(current, 'touchstart').pipe(
      map(e => toTouchEvent(e, current)),
      filter(e => e),
    );

    const touchEnd$ = fromEvent(current, 'touchend').pipe(
      map(e => toTouchEvent(e, current)),
      filter(e => e),
    );

    const touchMove$ = fromEvent(current, 'touchmove').pipe(
      map(e => toTouchEvent(e, current)),
      filter(e => e),
    );

    this.observables = {
      touchStart$,
      touchEnd$,
      touchMove$,
    };

    this.subscriptions = new SubscriptionManager({
      handleTouchStart: touchStart$.subscribe(this.handleTouchStart),
      handleTouchMove: touchMove$.subscribe(this.handleTouchMove),
      handleTouchEnd: touchEnd$.subscribe(this.handleTouchEnd),
    });
  }

  handleTouchStart = (e) => {
    const { current } = this.draggableRef;
    
    if (!current) return;
    
    current.style.transition = '';
  }

  handleTouchMove = (e) => {
    const touchPosition = e[this.axis];

    if (this.lastTouchPosition) {
      const delta = touchPosition - this.lastTouchPosition;

      this.move(delta);
    }

    this.lastTouchPosition = touchPosition;
  }

  handleTouchEnd = () => {
    this.animateToClosestRestingPoint();
  }

  move = (delta) => {
    const isMoveable = this.getIsMoveable(delta);

    if (!isMoveable) return;

    this.deltas.push(delta);

    this.updatePosition(this.currentPosition + delta);
  }

  getIsMoveable = (delta) => {
    const { isMoveable } = this.props;
    if (!isMoveable) return true;

    const isMoveableArgs = this.getMoveableArgs(delta);

    return isMoveable(isMoveableArgs);
  }

  getMoveableArgs = (delta) => ({
    delta,
    direction: delta > 0 ? DOWN : UP,
  });

  updatePosition = (pos) => {
    const { current } = this.draggableRef;
    if (!current) return;

    current.style.transform = `translate${this.axis.toUpperCase()}(${pos}px)`;

    this.currentPosition = pos;
  }

  animateTo = (
    point,
    animationDuration = (this.props.animationDuration || DEFAULT_ANIMATION_MS),
    element = this.draggableRef.current,
    velocity = this.getVelocity(),
    position = this.currentPosition,
  ) => {
    if (!point) return;

    const { position: targetPosition } = point;

    if (!Number.isInteger(targetPosition) || !element) return;

    const delta = targetPosition - position;

    const { bezierA, bezierB } = getBezierHandle(velocity, delta, animationDuration);

    element.style.transition = `transform ${animationDuration}ms cubic-bezier(${bezierA}, ${bezierB}, 0.5, 1)`;

    this.deltas.clear();
    this.lastTouchPosition = null;

    const { onAnimateTo } = this.props;
    safelyCall(onAnimateTo, {
      point,
      animationDuration,
      element,
      velocity,
      position,
    });

    this.updatePosition(targetPosition);
  }

  getClosestRestingPoint = (
    element = this.draggableRef.current,
    position = this.currentPosition,
    velocity = this.getVelocity(),
  ) => {
    const {
      restingPoints,
      slideEffect = DEFAULT_SLIDE_EFFECT,
    } = this.props;

    if (!restingPoints) return;

    const restingPointResult = getWinningRestingPoint({
      restingPoints,
      position,
      velocity,
      slideEffect,
      element,
    });

    return restingPointResult;
  }
  
  animateToClosestRestingPoint = () => {
    const { animationDuration = DEFAULT_ANIMATION_MS } = this.props;
    const element = this.draggableRef.current;
    const position = this.currentPosition;
    const velocity = this.getVelocity();

    const restingPointResult = this.getClosestRestingPoint(element, position, velocity);

    if (!restingPointResult) return;
    
    this.animateTo(
      restingPointResult,
      animationDuration,
      element,
      velocity,
      position,
    );
  }

  getVelocity = () => {
    return getVelocity(this.deltas.get());
  }

  render() {
    const { children } = this.props;

    return children({
      draggableRef: this.draggableRef,
      animateTo: this.animateTo,
      getClosestRestingPoint: this.getClosestRestingPoint,
      animateToClosestRestingPoint: this.animateToClosestRestingPoint,
    });
  }
}

export default Draggable;
