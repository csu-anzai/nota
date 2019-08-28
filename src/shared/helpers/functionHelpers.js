export const noop = () => {};

export const safelyCall = (maybeFunc, ...args) => {
  if (typeof maybeFunc === 'function') {
    return maybeFunc(...args);
  }
  return null;
};
