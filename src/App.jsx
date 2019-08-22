import React, { Component } from 'react';
import Navigation from './root/Navigation';
import Content from './root/Content';

class App extends Component {
  state = {
    navigationIsOpen: false,
    subnavigationIsOpen: false,
  }

  render() {
    return (
      <>
        <Navigation {...this.state} />
        <Content {...this.state} />
      </>
    );
  }
}

export default App;
