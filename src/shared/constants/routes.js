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
    action: ({ bookId }) => ({ type: 'READ_BOOK', payload: { bookId } }),
  },
};

export const routesMap = Object.keys(routes).reduce((acc, routesKey) => {
  const route = routes[routesKey];
  acc[route.type] = route.path;
  return acc;
}, {});

export default routes;
