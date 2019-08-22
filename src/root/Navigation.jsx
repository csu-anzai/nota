import React from 'react';
import styled from '@emotion/styled';
import Link from '../shared/Link';
import PATHS from '../shared/constants/paths';

const Navigation = () => (
  <NavigationContainer>
    <Link to={PATHS.HOME}>Home</Link>
    <Link to={PATHS.READ}>Read</Link>
  </NavigationContainer>
);

const NavigationContainer = styled.div``;

export default Navigation;
