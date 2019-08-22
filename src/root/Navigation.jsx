import React from 'react';
import styled from '@emotion/styled';
import Link from '../shared/Link';
import { Button } from '../shared/Html';
import Icon, { ICONS } from '../shared/Icon';
import routes from '../shared/constants/routes';

const Navigation = ({
  toggleNavigation,
  navigationIsOpen,
  children,
}) => (
  <>
    <NavigationContainer>
      <Button
        type="button"
        onClick={toggleNavigation}
      >
        <Icon icon={ICONS.MENU} />
      </Button>
      {navigationIsOpen && (
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

export default Navigation;
