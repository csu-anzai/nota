const COLLAPSED_HEIGHT = 54;

export const getAwayPosition = (el) => el.parentElement.clientHeight - COLLAPSED_HEIGHT;

export const FULL = {
  id: 1,
  position: 0,
  gravity: 10,
};

export const COLLAPSED = {
  id: 2,
  getPosition: getAwayPosition,
  gravity: 10,
};

export const HIDDEN = {
  id: 3,
  getPosition: () => window.innerHeight,
  gravity: 10,
};
