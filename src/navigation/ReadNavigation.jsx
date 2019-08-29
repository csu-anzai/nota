import React, { useState } from 'react';
import { connect } from 'react-redux';
import ChapterSelection from './ChapterSelection';
import BookSelection from './BookSelection';
import styled from '@emotion/styled';

const ReadNavigation = ({ bookName, chapterId, close }) => {
  const [selectedBookName, setSelectedBookName] = useState(bookName);

  if (selectedBookName) return (
    <ReadNavigationContainer>
      <ChapterSelection
        bookName={selectedBookName}
        isBookActive={selectedBookName === bookName}
        setSelectedBookName={setSelectedBookName}
        chapterId={chapterId}
        close={close}
      />
    </ReadNavigationContainer>
  );

  return (
    <ReadNavigationContainer>
      <BookSelection
        bookName={bookName}
        setSelectedBookName={setSelectedBookName}
      />
    </ReadNavigationContainer>
  );
};

const ReadNavigationContainer = styled.div`
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
`;

const mapStateToProps = state => ({
  ...state.location.payload,
});

export default connect(mapStateToProps)(ReadNavigation);