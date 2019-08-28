import React, { Component } from 'react';
import styled from '@emotion/styled';
import Navigation from '../navigation/Navigation';
import Content from './Content';

class App extends Component {
  state = {}

  render() {
    return (
      <AppContainer>
        <Navigation />
        <Content />
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  min-height: 0;
`;

export default App;
