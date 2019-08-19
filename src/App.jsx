import React, { Component } from 'react';
import DragContainer from './DragContainer';
import DraggableVerseCard from './read/verseCard/DraggableVerseCard';

class App extends Component {
  render() {
    return (
      <DragContainer>
        <DraggableVerseCard />
      </DragContainer>
    );
  }
}

export default App;
