import React from 'react';
import NavigationLink from './NavigationLink';
import routes from '../../shared/constants/routes';

const MainNavigation = ({ close }) => (
  <div>
    <NavigationLink to={routes.home.action()} onClick={close}>Home</NavigationLink>
    <NavigationLink to={routes.read.action()} onClick={close}>Read</NavigationLink>
  </div>
);

export default MainNavigation;
