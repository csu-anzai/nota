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
    verseText,
    verseNumber,
    selectedVerseNumber,
}) => {
  if (!verseText || !verseNumber) return null;

  const className = getVerseClasses(verseNumber, selectedVerseNumber, false);

  return (
    <>
      <VerseLink
        to={routes.readVerse.action({ verseId: verseNumber })}
        className={className}
      >
        <span className="verseNumber">{verseNumber}</span>
        {verseText}
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

  &.active {
    background-color: ${theme.primaryT};
  }

  &.hasAnnotations {
    background-color: ${theme.subtleT};
  }
`;

export default ReadCardVerse;
