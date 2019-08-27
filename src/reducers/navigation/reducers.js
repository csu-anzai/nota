import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

const isMainNavOpen = (
  state = false,
  action,
) => {
  switch (action.type) {
    case actionTypes.TOGGLE_IS_MAIN_NAV_OPEN:
      return !state;
    default:
      return state;
  }
};

const isBookNavOpen = (
  state = false,
  action,
) => {
  switch (action.type) {
    case actionTypes.TOGGLE_IS_BOOK_NAV_OPEN:
      return !state;
    default: 
      return state;
  }
};

export default combineReducers({ isMainNavOpen, isBookNavOpen });