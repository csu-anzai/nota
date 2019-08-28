import { getBookId, getChapterId } from "../helpers/locationHelpers";

const routes = {
  home: {
    title: 'Home',
    type: 'HOME',
    path: '/',
    action: () => ({ type: 'HOME' }),
  },
  read: {
    title: 'Read',
    type: 'READ',
    path: '/read',
    action: () => ({ type: 'READ'}),
  },
  readBook: {
    type: 'READ_BOOK',
    path: '/read/:bookId',
    getActiveRoute: () => routes.read,
    action: payload => ({ type: 'READ_BOOK', payload }),
  },
  readChapter: {
    type: 'READ_CHAPTER',
    path: '/read/:bookId/:chapterId',
    getActiveRoute: () => routes.read,
    action: ({ bookId = getBookId(), chapterId = getChapterId() } = {}) =>
      ({ type: 'READ_CHAPTER', payload: { bookId, chapterId } }),
  },
  readVerse: {
    type: 'READ_VERSE',
    path: '/read/:bookId/:chapterId/:verseId',
    getActiveRoute: () => routes.read,
    action: ({ bookId = getBookId(), chapterId = getChapterId(), verseId } = {}) => 
      ({ type: 'READ_VERSE', payload: { bookId, chapterId, verseId } }),
  },
};

export const { routesMap, activeRouteMap } = Object.keys(routes).reduce((acc, routesKey) => {
  const route = routes[routesKey];

  const {
    type,
    path,
    getActiveRoute = () => route,
  } = route;
  
  acc.routesMap[type] = path;
  acc.activeRouteMap[type] = getActiveRoute();
  
  return acc;
}, { routesMap: {}, activeRouteMap: {} });

export default routes;
