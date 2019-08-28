import React from 'react';
import { connect } from 'react-redux';
import * as navigationActions from '../reducers/navigation/actions';
import routes, { activeRouteMap } from '../shared/constants/routes';
import { BOOK_DETAILS } from '../shared/constants/books';
import NavigationIconButton from './NavigationIconButton';
import Icon, { ICONS } from '../shared/Icon';

const bookIconStyle = { marginTop: -4, marginLeft: 4 };

const getReadNavTitle = (location) => {
  const { payload: { bookName, chapterId } } = location;

  const currentBook = BOOK_DETAILS[bookName];
  if (!currentBook) return "Select a book";

  const { displayName } = BOOK_DETAILS[bookName];
  return [displayName, chapterId].join(' ');
}

const ReadNavHeader = ({
  location,
  toggleIsBookNavOpen,
}) => {
  const { type } = location;

  const isReadLocation = activeRouteMap[type].type === routes.read.type;
  console.log(isReadLocation);
  if (!isReadLocation) return null;

  const readNavTitle = getReadNavTitle(location);

  return (
    <NavigationIconButton
      type="button"
      onClick={toggleIsBookNavOpen}
    >
      {readNavTitle}
      <Icon icon={ICONS.ANGLE_DOWN} size={24} style={bookIconStyle} />
    </NavigationIconButton>
  );
};

const mapStateToProps = state => ({
  isBookNavOpen: state.navigation.isBookNavOpen,
  location: state.location,
});

const actions = {
  toggleIsBookNavOpen: navigationActions.toggleIsBookNavOpen,
};

export default connect(mapStateToProps, actions)(ReadNavHeader);
