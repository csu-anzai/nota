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
    action: payload => ({ type: 'READ_CHAPTER', payload }),
  },
  readVerse: {
    type: 'READ_VERSE',
    path: '/read/:bookId/:chapterId/:verseId',
    action: payload => ({ type: 'READ_VERSE', payload }),
  },
};

export const routesMap = Object.keys(routes).reduce((acc, routesKey) => {
  const route = routes[routesKey];
  acc[route.type] = route.path;
  return acc;
}, {});

export default routes;
