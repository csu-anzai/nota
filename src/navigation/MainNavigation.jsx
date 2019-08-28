import React from 'react';
import { connect } from 'react-redux';
import NavigationLink from './NavigationLink';
import routes, { activeRouteMap } from '../shared/constants/routes';

const MainNavigation = ({ close, locationType }) => {
  const { type } = activeRouteMap[locationType];

  const {
    home,
    read,
  } = routes;

  return (
    <div>
      <NavigationLink
        to={home.action()}
        onClick={close}
        isActive={() => type === home.type}
      >
        Home
      </NavigationLink>
      <NavigationLink
        to={read.action()}
        onClick={close}
        isActive={() => type === read.type}
      >
        Read
      </NavigationLink>
    </div>
  );
}

const mapStateToProps = state => ({
  locationType: state.location.type,
});

export default connect(mapStateToProps)(MainNavigation);
