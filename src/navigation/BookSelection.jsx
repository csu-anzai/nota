import React from 'react';
import { BOOK_DETAILS } from '../shared/constants/books';
import styled from '@emotion/styled';
import { Button } from '../shared/Html';
import theme from '../styles/theme';

const BookSelection = ({
  bookName,
  setSelectedBookName,
}) => {
  return Object.keys(BOOK_DETAILS).map((bookKey) => (
    <BookButton
      key={`${bookKey}-navigationButton`}
      type="button"
      className={bookName === bookKey ? 'active' : undefined}
      onClick={() => setSelectedBookName(bookKey)}
    >
      {BOOK_DETAILS[bookKey].displayName}
    </BookButton>
  ));
};

const BookButton = styled(Button)`
  display: block;
  padding: 12px 16px;
  text-decoration: none;
  font-size: 20px;
  color: ${theme.blank};
  width: 100%;
  text-align: left;

  &.active {
    background-color: ${theme.primary};
  }
`;

export default BookSelection;
