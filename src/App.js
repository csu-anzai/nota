import React, { Component } from 'react';
import './App.css';
import DragContainer from './DragContainer';
import DragCard from './DragCard';

class App extends Component {
  render() {
    return (
      <DragContainer>
        <DragCard>
          <span>Hello</span>
        </DragCard>
      </DragContainer>
    );
  }
}

export default App;
