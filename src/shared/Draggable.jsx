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

class Draggable {
  constructor(props) {
    const {
      axis = DEFAULT_AXIS,
      startingPosition = DEFAULT_STARTING_POSITION,
      ref,
      restingPoints,
      animationDuration = DEFAULT_ANIMATION_MS,
      slideEffect = DEFAULT_SLIDE_EFFECT,
      onAnimateTo,
      getIsMoveable,
    } = props;
    
    this.axis = axis;
    this.currentPosition = startingPosition || 0;
    
    this.lastTouchPosition = null;
    this.deltas = new CappedArray(3);

    this.observables = null;
    this.subscriptions = null;
    this.ref = ref;

    this.restingPoints = restingPoints;
    this.animationDuration = animationDuration;
    this.slideEffect = slideEffect;

    this.getIsMoveable = getIsMoveable;
    this.onAnimateTo = onAnimateTo;

    this.init();
  }

  init = () => {
    if (this.observables || this.subscriptions) return;

    const { ref } = this;

    if (!ref) return;

    const touchStart$ = fromEvent(ref, 'touchstart').pipe(
      map(e => toTouchEvent(e, ref)),
      filter(e => e),
    );

    const touchEnd$ = fromEvent(ref, 'touchend').pipe(
      map(e => toTouchEvent(e, ref)),
      filter(e => e),
    );

    const touchMove$ = fromEvent(ref, 'touchmove').pipe(
      map(e => toTouchEvent(e, ref)),
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

  destroy = () => {
    if (!this.subscriptions) return;
    
    this.subscriptions.unsubscribe();
  }

  handleTouchStart = () => {
    const { ref } = this;
    
    if (!ref) return;
    
    ref.style.transition = '';
  }

  handleTouchMove = (e) => {
    const touchPosition = e[this.axis];

    if (this.lastTouchPosition) {
      const delta = touchPosition - this.lastTouchPosition;

      const isMoveable = !this.getIsMoveable || this.getIsMoveable(this.getMoveableArgs(e, delta));
      if (isMoveable) this.move(delta);
    }

    this.lastTouchPosition = touchPosition;
  }

  handleTouchEnd = () => {
    this.animateToClosestRestingPoint();
  }

  move = (delta) => {
    this.deltas.push(delta);

    this.updatePosition(this.currentPosition + delta);
  }

  getMoveableArgs = (e, delta) => ({
    event: e,
    delta,
    direction: delta > 0 ? DOWN : UP,
  });

  updatePosition = (pos) => {
    const { ref } = this;
    if (!ref) return;

    ref.style.transform = `translate${this.axis.toUpperCase()}(${pos}px)`;

    this.currentPosition = pos;
  }

  animateTo = (
    point,
    animationDuration = this.animationDuration,
    element = this.ref,
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

    safelyCall(this.onAnimateTo, {
      point,
      animationDuration,
      element,
      velocity,
      position,
    });

    this.updatePosition(targetPosition);
  }

  getClosestRestingPoint = (
    restingPoints = this.restingPoints,
    element = this.ref,
    position = this.currentPosition,
    velocity = this.getVelocity(),
  ) => {
    const {
      slideEffect,
    } = this;

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

  setRestingPoints = (restingPoints) => {
    this.restingPoints = restingPoints;
  }
  
  animateToClosestRestingPoint = (restingPoints = this.restingPoints) => {
    const { animationDuration } = this;
    const element = this.ref;
    const position = this.currentPosition;
    const velocity = this.getVelocity();

    const restingPointResult = this.getClosestRestingPoint(restingPoints, element, position, velocity);
    if (!restingPointResult) return;
    
    this.animateTo(
      restingPointResult,
      animationDuration,
      element,
      velocity,
      position,
    );
  }

  animateToRestingPoint = (restingPoint) => {
    this.animateToClosestRestingPoint([restingPoint]);
  }

  getVelocity = () => {
    return getVelocity(this.deltas.get());
  }
}

export default Draggable;
