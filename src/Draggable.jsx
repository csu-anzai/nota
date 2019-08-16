import React, { Component } from 'react';
import CappedArray from './cappedArray';
import SubscriptionManager from './subscriptionManager';
import { getVelocity, getWinningRestingPoint, getBezierHandle, toTouchEvent } from './draggableHelpers';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export const AXIS = {
  X: 'x',
  Y: 'y',
};

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

    console.log('init', current);

    if (!current) return;

    const touchStart$ = fromEvent(current, 'touchstart').pipe(map(toTouchEvent));
    const touchEnd$ = fromEvent(current, 'touchend');
    const touchMove$ = fromEvent(current, 'touchmove').pipe(map(toTouchEvent));

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
    const { restingPoints } = this.props;

    if (!restingPoints) return;
    // TODO: validateRestingPoints(restingPoints)

    const { current } = this.draggableRef;
    if (!current) return;

    const {
      slideEffect = DEFAULT_SLIDE_EFFECT,
      animationDuration = DEFAULT_ANIMATION_MS,
    } = this.props;
    
    const velocity = getVelocity(this.deltas.get());

    const restingPointPosition = getWinningRestingPoint({
      restingPoints,
      position: this.lastTouchPosition,
      velocity,
      slideEffect,
      element: current,
    });

    console.log(restingPointPosition);

    if (!Number.isInteger(restingPointPosition)) return;

    const delta = restingPointPosition - this.lastTouchPosition;

    const { bezierA, bezierB } = getBezierHandle(velocity, delta, animationDuration);

    current.style.transition = `transform ${animationDuration}ms cubic-bezier(${bezierA}, ${bezierB}, 0.5, 1)`;

    this.deltas.clear();
    this.lastTouchPosition = null;

    this.updatePosition(restingPointPosition);
  }

  move = (delta) => {
    this.deltas.push(delta);

    this.updatePosition(this.currentPosition + delta);
  }

  updatePosition = (pos) => {
    const { current } = this.draggableRef;
    if (!current) return;

    current.style.transform = `translate${this.axis.toUpperCase()}(${pos}px)`;

    this.currentPosition = pos;
  }

  render() {
    const { children } = this.props;

    return children({
      draggableRef: this.draggableRef,
    });
  }
}

export default Draggable;
