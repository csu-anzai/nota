import bible from '../books/web-formatted';
import memoize from 'lodash.memoize';
import { BOOK_DETAILS } from '../constants/books';
import { getLocationPayload } from './locationHelpers';

const getBlockForVerseId = (blocks, verseId) => {
  if (!Array.isArray(blocks) || !verseId) return null;

  const verseInt = parseInt(verseId, 10);
  
  let totalVerses = 0;

  for (let i = 0, { length } = blocks; i < length; i += 1) {
    const currentBlock = blocks[i];
    const { length: currentBlockLength } = currentBlock;

    if (totalVerses + currentBlockLength >= verseInt) {
      return { block: currentBlock, firstVerseInBlock: totalVerses };
    }

    totalVerses += currentBlockLength;
  }

  return { block: null, firstVerseInBlock: 0 };
};

export const getVerseLines = ({ bookName, chapterId, verseId }) => {
  try {
    const chapterBlocks = bible[bookName].chapters[chapterId].blocks;

    const verseInt = parseInt(verseId, 10);

    const { block, firstVerseInBlock } = getBlockForVerseId(chapterBlocks, verseId);

    return block[verseInt - firstVerseInBlock - 1];
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getVerseText = (args) => {
  const verseLines = getVerseLines(args);

  if (!Array.isArray(verseLines)) return 'Couldn\'t get verse text';

  return verseLines.reduce((fullText, { text, quote }) => `${fullText}${text || quote}`, '');
};

export const getVerseTitle = ({ bookName, chapterId, verseId }) => {
  const { displayName: bookTitle } = BOOK_DETAILS[bookName];

  return `${bookTitle} ${chapterId}:${verseId}`;
}

export const getVerseId = ({ bookName, chapterId, verseId }) => {
  const { id: bookId } = BOOK_DETAILS[bookName];

  const paddedBookId = `${bookId}`.padStart(2, '0');
  const paddedChapterId = `${chapterId}`.padStart(3, '0');
  const paddedVerseId = `${verseId}`.padStart(3, '0');

  return `${paddedBookId}${paddedChapterId}${paddedVerseId}`;
};

export const getVerse = memoize((args = getLocationPayload()) => {
  const text = getVerseText(args);
  
  if (!text) return null;
  
  return {
    id: getVerseId(args),
    title: getVerseTitle(args),
    text,
  };
});