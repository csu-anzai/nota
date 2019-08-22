import React from 'react';
import styled from '@emotion/styled';
import Link from '../shared/Link';
import PATHS from '../shared/constants/paths';
import { Button } from '../shared/Html';
import Icon, { ICONS } from '../shared/Icon';

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
          <Link to={PATHS.HOME}>Home</Link>
          <Link to={PATHS.READ}>Read</Link>
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
