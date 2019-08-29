import React from 'react';
import { connect } from 'react-redux';
import bibleWeb from '../../shared/books/web';
import { BOOK_DETAILS } from '../../shared/constants/books';
import ReadCardVerse from './ReadCardVerse';

const ReadCardChapter = ({
  bookName,
  chapterId,
}) => {
  const bookDetails = BOOK_DETAILS[bookName];
  const { id: bookId } = bookDetails || {};

  console.log(bookDetails, bookId, chapterId);

  let versesText = null;
  try {
    versesText = bibleWeb[bookId][chapterId];
  } catch (e) {
    // nothing
  }

  if (!versesText) return 'Invalid book / chapter';

  return versesText.map((verseText, index) => (
    <ReadCardVerse
      key={`readChapter-${index}`}
      verseText={verseText}
      verseNumber={index + 1}
    />
  ));
};

const mapStateToProps = state => ({
  ...state.location.payload,
});

export default connect(mapStateToProps)(ReadCardChapter);
