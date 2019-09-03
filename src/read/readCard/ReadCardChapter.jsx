import React from 'react';
import { connect } from 'react-redux';
import bibleWeb from '../../shared/books/web-formatted';
// import { BOOK_DETAILS } from '../../shared/constants/books';
import ReadCardVerse from './ReadCardVerse';

const ReadCardChapter = ({
  bookName,
  chapterId,
  verseId,
}) => {
  let chapter = null;
  try {
    chapter = bibleWeb[bookName].chapters[chapterId];
  } catch (e) {
    // nothing
  }

  if (!chapter) return 'Invalid book / chapter';

  let verseNumber = 1;

  return chapter.blocks.map((block, index) => {
    const blockKey = `readChapterBlock-${bookName}-${index}`;

    return (
      <p key={blockKey}>
        {block.map((verseLines, lineIndex) => {
          const lineKey = `${blockKey}-${lineIndex}`;
          
          return (
            <ReadCardVerse
              key={lineKey}
              lineKey={lineKey}
              verseLines={verseLines}
              verseNumber={verseNumber++}
              selectedVerseNumber={verseId}
            />
          );
        })}
      </p>
    );
  });
};

const mapStateToProps = state => ({
  ...state.location.payload,
});

export default connect(mapStateToProps)(ReadCardChapter);
