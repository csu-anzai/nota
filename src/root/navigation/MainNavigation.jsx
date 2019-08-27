import React from 'react';
import Link from '../../shared/Link';
import routes from '../../shared/constants/routes';

const MainNavigation = () => (
  <div>
    <Link to={routes.home.action()}>Home</Link>
    <Link to={routes.read.action()}>Read</Link>
  </div>
);

export default MainNavigation;
