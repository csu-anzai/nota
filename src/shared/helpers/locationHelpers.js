import { store } from '../..';

export const getLocationPayload = () => store.getState().location.payload;

export const getBookId = () => {
  const { bookId } = getLocationPayload();
  return bookId;
};

export const getChapterId = () => {
  const { chapterId } = getLocationPayload();
  return chapterId;
};

export const goTo = (action) => store.dispatch(action);