import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import Link from '../shared/Link';
import { Button } from '../shared/Html';
import Icon, { ICONS } from '../shared/Icon';
import routes from '../shared/constants/routes';
import * as navigationActions from '../reducers/navigation/actions';

const Navigation = ({
  toggleIsMainNavOpen,
  isMainNavOpen,
  children,
}) => (
  <>
    <NavigationContainer>
      <Button
        type="button"
        onClick={toggleIsMainNavOpen}
      >
        <Icon icon={ICONS.MENU} />
      </Button>
      {isMainNavOpen && (
        <div>
          <Link to={routes.home.action()}>Home</Link>
          <Link to={routes.read.action()}>Read</Link>
        </div>
      )}
    </NavigationContainer>
    {children}
  </>
);

const NavigationContainer = styled.div`
  color: white;
  height: 40px;
`;

const mapStateToProps = state => ({
  isMainNavOpen: state.navigation.isMainNavOpen,
});

const actions = {
  toggleIsMainNavOpen: navigationActions.toggleIsMainNavOpen,
};

export default connect(mapStateToProps, actions)(Navigation);
