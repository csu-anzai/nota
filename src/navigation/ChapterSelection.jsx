import React from 'react';
import NavigationIconButton from './NavigationIconButton';
import { NavLink } from 'redux-first-router-link';
import Icon, { ICONS } from '../shared/Icon';
import { BOOK_DETAILS } from '../shared/constants/books';
import routes from '../shared/constants/routes';
import styled from '@emotion/styled';
import theme from '../styles/theme';

const ChapterSelection = ({
  bookName,
  isBookActive,
  chapterId,
  showBookSelection,
  close,
}) => {
  const {numberOfChapters} = BOOK_DETAILS[bookName] || {};
  if (!numberOfChapters) return null;

  const chapterButtons = [];

  for (let i = 1; i <= numberOfChapters; i += 1) {
    chapterButtons.push(
      <ChapterButton
        key={`${bookName}-${i}-navigationButton`}
        isActive={() => isBookActive && chapterId === i}
        onClick={close}
        to={routes.readChapter.action({ bookName, chapterId: i })}
      >
        {i}
      </ChapterButton>
    )
  }

  return (
    <>
      <NavigationIconButton
        type="button"
        onClick={showBookSelection}
      >
        <Icon icon={ICONS.ANGLE_LEFT} />
        All books
      </NavigationIconButton>
      <div style={{ marginTop: 16 }}>
        {chapterButtons}
      </div>
    </>
  );
};

const ChapterButton = styled(NavLink)`
  text-decoration: none;
  font-size: 20px;
  color: ${theme.blank};
  width: 70px;
  height: 70px;
  padding: 12px;
  border: 1px solid ${theme.secondary};
  margin: 0 0 16px 16px;
  display: inline-block;
  font-weight: bold;

  &.active {
    background-color: ${theme.secondary};
  }
`;

export default ChapterSelection;
