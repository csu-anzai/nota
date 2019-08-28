import React from 'react';
import styled from '@emotion/styled';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import Icon, { ICONS } from '../shared/Icon';
import * as navigationActions from '../reducers/navigation/actions';
import MainNavigation from './MainNavigation';
import ReadNavigation from './ReadNavigation';
import NavigationIconButton from './NavigationIconButton';
import ReadNavHeader from './ReadNavHeader';

const menuIconStyle = { marginTop: -6 };

const Navigation = ({
  toggleIsMainNavOpen,
  toggleIsBookNavOpen,
  isMainNavOpen,
  isBookNavOpen,
  children,
}) => (
  <>
    <NavigationContainer>
      <NavigationIconButton
        type="button"
        onClick={toggleIsMainNavOpen}
      >
        <Icon icon={ICONS.MENU} size={24} style={menuIconStyle} />
      </NavigationIconButton>
      <ReadNavHeader
        toggleIsBookNavOpen={toggleIsBookNavOpen}
      />
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

const mapStateToProps = state => ({
  isMainNavOpen: state.navigation.isMainNavOpen,
  isBookNavOpen: state.navigation.isBookNavOpen
});

const actions = {
  toggleIsMainNavOpen: navigationActions.toggleIsMainNavOpen,
  toggleIsBookNavOpen: navigationActions.toggleIsBookNavOpen,
};

export default connect(mapStateToProps, actions)(Navigation);
