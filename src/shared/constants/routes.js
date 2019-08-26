import { getBookId, getChapterId } from "../helpers/locationHelpers";

const routes = {
  home: {
    type: 'HOME',
    path: '/',
    action: () => ({ type: 'HOME' }),
  },
  read: {
    type: 'READ',
    path: '/read',
    action: () => ({ type: 'READ'}),
  },
  readBook: {
    type: 'READ_BOOK',
    path: '/read/:bookId',
    action: payload => ({ type: 'READ_BOOK', payload }),
  },
  readChapter: {
    type: 'READ_CHAPTER',
    path: '/read/:bookId/:chapterId',
    action: ({ bookId = getBookId(), chapterId = getChapterId() } = {}) =>
      ({ type: 'READ_CHAPTER', payload: { bookId, chapterId } }),
  },
  readVerse: {
    type: 'READ_VERSE',
    path: '/read/:bookId/:chapterId/:verseId',
    action: ({ bookId = getBookId(), chapterId = getChapterId(), verseId } = {}) => 
      ({ type: 'READ_VERSE', payload: { bookId, chapterId, verseId } }),
  },
};

export const routesMap = Object.keys(routes).reduce((acc, routesKey) => {
  const route = routes[routesKey];
  acc[route.type] = route.path;
  return acc;
}, {});

export default routes;
