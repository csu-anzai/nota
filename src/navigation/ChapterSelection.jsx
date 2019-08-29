import React from 'react';
import NavigationIconButton from './NavigationIconButton';
import Icon, { ICONS } from '../shared/Icon';
import { BOOK_DETAILS } from '../shared/constants/books';
import routes from '../shared/constants/routes';
import styled from '@emotion/styled';
import NavigationLink from './NavigationLink';

const ChapterSelection = ({
  bookName,
  isBookActive,
  chapterId,
  setSelectedBookName,
  close,
}) => {
  const {numberOfChapters} = BOOK_DETAILS[bookName] || {};
  if (!numberOfChapters) throw new Error(`Invalid bookName: ${bookName}`);

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
        onClick={() => setSelectedBookName(null)}
      >
        <Icon icon={ICONS.ANGLE_LEFT} />
        All books
      </NavigationIconButton>
      {chapterButtons}
    </>
  );
};

const ChapterButton = styled(NavigationLink)``;

export default ChapterSelection;
