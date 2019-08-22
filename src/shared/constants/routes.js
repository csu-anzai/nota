export const routeTypes = {
  HOME: 'HOME',
  READ: 'READ',
  READ_BOOK: 'READ_BOOK',
  READ_CHAPTER: 'READ_CHAPTER',
  READ_VERSE: 'READ_VERSE',
};

export const routesMap = {
  [routeTypes.HOME]: '/',
  [routeTypes.READ]: '/read',
  [routeTypes.READ_BOOK]: '/read/:bookId',
  [routeTypes.READ_CHAPTER]: '/read/:bookId/:chapterId',
  [routeTypes.READ_VERSE]: '/read/:bookId/:chapterId/:verseId',
};
