import React from 'react';

const ReadCardVerse = ({
    verseText,
    verseNumber,
}) => {
  if (!verseText || !verseNumber) return null;

  return (
    <>
      <span className="verse">
        <span className="verseNumber">{verseNumber}</span>
        {verseText}
      </span>
    </>
  );
};

export default ReadCardVerse;
