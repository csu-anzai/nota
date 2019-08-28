import React from 'react';
import Link from '../../shared/Link';
import routes from '../../shared/constants/routes';

const MainNavigation = ({ close }) => (
  <div>
    <Link to={routes.home.action()} onClick={close}>Home</Link>
    <Link to={routes.read.action()} onClick={close}>Read</Link>
  </div>
);

export default MainNavigation;
