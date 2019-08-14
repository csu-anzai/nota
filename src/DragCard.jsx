import React, { Component } from 'react';
import styled from '@emotion/styled';

const FRICTION = .9998;

class DragCard extends Component {
  constructor(props) {
    super(props);

    this.currentPosition = [0, 0];
    this.lastTouchPosition = null;
    this.lastDelta = [0, 0];

    this.card = React.createRef();
  }

  componentDidMount() {
    const { current } = this.card || {};
    if (!current) return;

    current.addEventListener('touchstart', this.touchStart);
    current.addEventListener('touchmove', this.touchMove);
    // current.addEventListener('touchcancel', this.touchMove);
    current.addEventListener('touchend', this.touchEnd);
  }

  touchStart = (e) => {
    // console.log(e);
    const { current: card } = this.card;
    this.currentPosition = [parseInt(card.style.left || '0', 10), parseInt(card.style.top || '0', 10)];
    // console.log('start', this.currentPosition);
  }

  touchEnd = () => {
    this.lastTouchPosition = null;
    const [deltaX, deltaY] = this.lastDelta;
    const velocityX = deltaX;
    const velocityY = deltaY;
    // console.log('end', velocityX, velocityY);
    window.requestAnimationFrame(() => this.decay(velocityX, velocityY));
  }

  decay = (velocityX, velocityY, elapsedTime = 1) => {
    if (Math.abs(velocityX) < 0.01  || Math.abs(velocityY) < 0.01) return;

    const newVX = velocityX * FRICTION * (1 / elapsedTime) ;
    const newVY = velocityY * FRICTION * (1 / elapsedTime);
    this.move(newVX, newVY);

    window.requestAnimationFrame(() => this.decay(newVX, newVY, elapsedTime + (1/100)));
  }

  touchMove = (e) => {
    const mainTouch = e.touches[0];
    const { screenX, screenY } = mainTouch;

    if (this.lastTouchPosition) {
      const [x, y] = this.lastTouchPosition;

      const deltaX = screenX - x;
      const deltaY = screenY - y;

      this.move(deltaX, deltaY);
    }

    this.lastTouchPosition = [screenX, screenY];
  }

  move = (deltaX, deltaY) => {
    const [currentX, currentY] = this.currentPosition;

    const positionX = currentX + deltaX;
    const positionY = currentY + deltaY;

    this.updatePosition(positionX, positionY);
    this.lastDelta = [(this.lastDelta[0] * 2 + deltaX)/3, (this.lastDelta[0] * 2 + deltaY)/3];
    // console.log('move', deltaX, positionX, deltaY, positionY);
  }

  updatePosition = (x, y) => {
    const { current: card } = this.card;
    card.style.top = `${y}px`;
    card.style.left = `${x}px`; 
    this.currentPosition = [x, y];
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
