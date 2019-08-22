import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Provider } from 'react-redux';
import Navigation from './root/Navigation';
import Content from './root/Content';
import configureStore from './configureStore';

class App extends Component {
  state = {
    navigationIsOpen: false,
    subnavigationIsOpen: false,
  }

  toggleNavigation = () => {
    this.setState(({ navigationIsOpen }) => ({ navigationIsOpen: !navigationIsOpen }));
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <AppContainer>
          <Navigation
            setState={this.setState} 
            toggleNavigation={this.toggleNavigation}
            {...this.state}
          />
          <Content {...this.state} />
        </AppContainer>
      </Provider>
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
