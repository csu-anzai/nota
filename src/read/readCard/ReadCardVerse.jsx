import React from 'react';
import Link from 'redux-first-router-link';
import routes from '../../shared/constants/routes';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

const ReadCardVerse = ({
    verseText,
    verseNumber,
    selectedVerseNumber,
}) => {
  if (!verseText || !verseNumber) return null;

  return (
    <>
      <VerseLink
        to={routes.readVerse.action({ verseId: verseNumber })}
        hasAnnotations={verseNumber === 3 || verseNumber === 4}
        active={selectedVerseNumber === verseNumber}
      >
        <span className="verseNumber">{verseNumber}</span>
        {verseText}
      </VerseLink>
    </>
  );
};

const getBackgroundColor = ({ hasAnnotations, active }) => {
  if (active) return theme.primaryT;
  if (hasAnnotations) return theme.subtleT;
  return 'transparent';
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
  background-color: ${getBackgroundColor};
`;

export default ReadCardVerse;
