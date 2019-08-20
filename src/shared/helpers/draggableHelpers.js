const APPROX_MAX_DIFFERENCE = 20;

export const toTouchEvent = (e, current) => {
  const mainTouch = e.touches[0];
  // e.preventDefault();
  // e.stopPropagation();


  if (!mainTouch) return {};

  const { screenX, screenY } = mainTouch;
  
  return { x: screenX, y: screenY, target: e.target };
};

export const getWinningRestingPoint = (args) => {
  const { restingPoints } = args;

  const restingPointResult = restingPoints.reduce((target, restingPoint) => {
    const { score, position } = getRestingPointScore(restingPoint, args);
    
    if (score > target.score) return { score, position, restingPoint };

    return target;
  }, { score: 0, position: 0, restingPoint: null });
  
  return restingPointResult;
};

const getRestingPointScore = (
  { position: maybeRestingPointPosition, getPosition, gravity },
  { position, velocity, slideEffect, element },
) => {
  let restingPointPosition = null;

  if (Number.isInteger(maybeRestingPointPosition)) restingPointPosition = maybeRestingPointPosition;
  else if (typeof getPosition === 'function') restingPointPosition = getPosition(element);

  if (!position) return { score: 0, restingPointPosition: 0 };

  return {
    score: (gravity / Math.abs(restingPointPosition - (position + velocity * slideEffect))),
    position: restingPointPosition,
  };
};

const getNextVelocity = (
  velocity,
  delta,
  index
) => {
  const factor = (1 / (index + 1));

  return velocity + (delta * factor);
};

export const getVelocity = (deltas) => deltas.reduce(getNextVelocity, 0);

const signsAreDifferent = (a, b) => a * b < 0;

const clamp = (number, bottom, top) => {
  if (number > top) return top;
  if (number < bottom) return bottom;
  return number;
}

export const getBezierHandle = (velocity, delta, animationTime, { approxMaxDifference = APPROX_MAX_DIFFERENCE } = {}) => {
  const averageVelocityForMove = delta * (animationTime / 1000) / 60;

  const relativeMagnitudeOfVelocity = (Math.abs(velocity) - Math.abs(averageVelocityForMove)) / approxMaxDifference; // why 20?;
  const clampedRMV = clamp(relativeMagnitudeOfVelocity, -1, 1);

  let bezierA = -0.5 * clampedRMV + 0.5; // A = -(1/2)rmv + 0.5
  let bezierB = 0.5 * clampedRMV + 0.5; // B = (1/2)rmv + 0.5

  bezierA = clamp(bezierA, 0, 1); // prevent spilling outside logical range
  bezierB = clamp(bezierB, -1, 1); // prevent spilling outside logical range

  if (signsAreDifferent(velocity, averageVelocityForMove)) { // if moving in the wrong direction
    bezierB *= -1; // flip B
  }

  // console.log({
  //   bezierA,
  //   bezierB,
  //   delta,
  //   relativeMagnitudeOfVelocity,
  //   velocity,
  //   averageVelocityForMove,
  // });

  return { bezierA, bezierB };
}