import React from 'react';
import styled from '@emotion/styled';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { Button } from '../../shared/Html';
import Icon, { ICONS } from '../../shared/Icon';
import * as navigationActions from '../../reducers/navigation/actions';
import MainNavigation from './MainNavigation';
import ReadNavigation from './ReadNavigation';

const menuIconStyle = { marginTop: -6 };
const bookIconStyle = { marginTop: -4, marginLeft: 4 };

const Navigation = ({
  toggleIsMainNavOpen,
  toggleIsBookNavOpen,
  isMainNavOpen,
  isBookNavOpen,
  children,
}) => (
  <>
    <NavigationContainer>
      <NavIconButton
        type="button"
        onClick={toggleIsMainNavOpen}
      >
        <Icon icon={ICONS.MENU} size={24} style={menuIconStyle} />
      </NavIconButton>
      <NavIconButton
        type="button"
        onClick={toggleIsBookNavOpen}
      >
        Mark 4
        <Icon icon={ICONS.ANGLE_DOWN} size={24} style={bookIconStyle} />
      </NavIconButton>
      <CSSTransition
        in={isMainNavOpen}
        timeout={200}
        classNames="navigationItems"
        unmountOnExit
      >
        <MainNavigation close={toggleIsMainNavOpen} />
      </CSSTransition>
      <CSSTransition
        in={isBookNavOpen}
        timeout={200}
        classNames="navigationItems"
        unmountOnExit
      >
        <ReadNavigation close={toggleIsBookNavOpen} />
      </CSSTransition>
    </NavigationContainer>
    {children}
  </>
);

const NavigationContainer = styled.div`
  color: white;
  height: 50px;
`;

const NavIconButton = styled(Button)`
  height: 50px;
  padding: 0 12px;
  font-size: 18px;
  line-height: 50px;
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
