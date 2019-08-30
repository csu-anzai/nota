import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import ChapterSelection from './ChapterSelection';
import BookSelection from './BookSelection';
import styled from '@emotion/styled';
import theme from '../styles/theme';

const ReadNavigation = ({ bookName, chapterId, close }) => {
  const [selectedBookName, setSelectedBookName] = useState(bookName);
  const [showChapterSelection, setShowChapterSelection] = useState(!!selectedBookName);

  const handleBookSelection = (bookName) => {
    setSelectedBookName(bookName);
    setShowChapterSelection(true);
  };

  const showBookSelection = () => setShowChapterSelection(false);

  return (
    <>
      <CSSTransition
        in={showChapterSelection}
        timeout={200}
        classNames="chapterSelection"
        unmountOnExit
      >
        <ReadNavigationContainer>
          <ChapterSelection
            bookName={selectedBookName}
            isBookActive={selectedBookName === bookName}
            chapterId={chapterId}
            showBookSelection={showBookSelection}
            close={close}
          />
        </ReadNavigationContainer>
      </CSSTransition>
      <CSSTransition
        in={!showChapterSelection}
        timeout={200}
        classNames="bookSelection"
        unmountOnExit
      >
        <ReadNavigationContainer>
          <BookSelection
            bookName={bookName}
            handleBookSelection={handleBookSelection}
          />
        </ReadNavigationContainer>
      </CSSTransition>
    </>
  );
};

const ReadNavigationContainer = styled.div`
  position: fixed;
  top: ${theme.topbarSize}px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  padding-bottom: 100px;
`;

const mapStateToProps = state => ({
  ...state.location.payload,
});

export default connect(mapStateToProps)(ReadNavigation);