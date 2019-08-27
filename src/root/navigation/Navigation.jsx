import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Button } from '../../shared/Html';
import Icon, { ICONS } from '../../shared/Icon';
import * as navigationActions from '../../reducers/navigation/actions';
import MainNavigation from './MainNavigation';
import ReadNavigation from './ReadNavigation';

const Navigation = ({
  toggleIsMainNavOpen,
  toggleIsBookNavOpen,
  isMainNavOpen,
  isBookNavOpen,
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
      <Button
        type="button"
        onClick={toggleIsBookNavOpen}
      >
        <Icon icon={ICONS.ANGLE_DOWN} />
      </Button>
      {isMainNavOpen && <MainNavigation />}
      {isBookNavOpen && <ReadNavigation />}
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
  isBookNavOpen: state.navigation.isBookNavOpen
});

const actions = {
  toggleIsMainNavOpen: navigationActions.toggleIsMainNavOpen,
  toggleIsBookNavOpen: navigationActions.toggleIsBookNavOpen,
};

export default connect(mapStateToProps, actions)(Navigation);
