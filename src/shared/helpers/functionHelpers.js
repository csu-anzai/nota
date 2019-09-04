export const noop = () => {};

export const safelyCall = (maybeFunc, ...args) => {
  if (typeof maybeFunc === 'function') {
    return maybeFunc(...args);
  }
  return null;
};

export const getEnsureState = (that) => newState => {
  const { state, setState } = that;
  
  let newStateIsDifferent = Object.keys(newState)
    .some(stateKey => state[stateKey] !== newState[stateKey]);
  
  if (newStateIsDifferent) setState.bind(that)(newState);
};
