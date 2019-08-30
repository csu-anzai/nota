import { store } from '../..';

export const getLocationPayload = () => store.getState().location.payload;

export const getBookName = () => {
  const { bookName } = getLocationPayload();
  return bookName;
};

export const getChapterId = () => {
  const { chapterId } = getLocationPayload();
  return chapterId;
};

export const goTo = (action) => store.dispatch(action);