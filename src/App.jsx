import React, { Component } from 'react';
import DragContainer from './DragContainer';
import DraggableCard from './DraggableCard';

class App extends Component {
  render() {
    return (
      <DragContainer>
        <DraggableCard>
          <span>Hello</span>
        </DraggableCard>
      </DragContainer>
    );
  }
}

export default App;
