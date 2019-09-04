import React from 'react';
import { connect } from 'react-redux';
import Home from '../home/Home';
import Read from '../read/Read';
import routes from '../shared/constants/routes';

const Content = ({ path }) => {
  switch (path) {
    // case routeTypes.HOME:
    //   return <Home />;
    case routes.read.type:
    case routes.readBook.type:
    case routes.readChapter.type:
    case routes.readVerse.type:
    case routes.createAnnotation.type:
      return <Read />;
    default:
      return <Home />;
  }
};

export default connect(state => ({ path: state.location.type }))(Content);
