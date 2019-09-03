import React from 'react';
import Link from 'redux-first-router-link';
import routes from '../../shared/constants/routes';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

const getVerseClasses = (verseNumber, selectedVerseNumber, hasAnnotations) => {
  if (verseNumber === selectedVerseNumber) return 'active';
  if (hasAnnotations) return 'hasAnnotations';
  return undefined;
}

const ReadCardVerse = ({
    verseLines,
    verseNumber,
    selectedVerseNumber,
    lineKey,
}) => {
  if (!verseLines || !verseNumber) return null;

  const className = getVerseClasses(verseNumber, selectedVerseNumber, false);

  return (
    <>
      <VerseLink
        to={routes.readVerse.action({ verseId: verseNumber })}
        className={className}
      >
        {verseLines.map(({ text, quote }, index) => {
          const key = `${lineKey}-${index}`;

          if (text) {
            return (
              <span className="text" key={key}>
                {index === 0 && <span className="verseNumber">{verseNumber}</span>}
                {text}
              </span>
            );
          } else if (quote) {
            return (
              <span className="quote" key={key}>
                {index === 0 && <span className="verseNumber">{verseNumber}</span>}
                {quote}
              </span>
            );
          }
          
          return null;
        })}
      </VerseLink>
    </>
  );
};

const VerseLink = styled(Link)`
  text-decoration: none;
  color: ${theme.text};
  text-decoration: none;
  color: #585858;
  line-height: 1.7em;
  padding: 2px 4px;
  font-size: 18px;
  -webkit-tap-highlight-color: ${theme.secondaryT};
  margin-right: 2px;

  .quote {
    display: inline-block;
    margin: 0 10%;
    width: 80%;
  }

  &.active {
    .text, .quote {
      background-color: ${theme.primaryT};
    }
  }

  &.hasAnnotations {
    background-color: ${theme.subtleT};
  }
`;

export default ReadCardVerse;
