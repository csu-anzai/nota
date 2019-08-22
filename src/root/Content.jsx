import React from 'react';
import { connect } from 'react-redux';
import Home from '../home/Home';
import Read from '../read/Read';
import { routeTypes } from '../configureStore';

const Content = ({ path }) => {
  switch (path) {
    // case routeTypes.HOME:
    //   return <Home />;
    case routeTypes.READ:
      return <Read />;
    default:
      return <Home />;
  }
};

export default connect(state => ({ path: state.location.type }))(Content);
