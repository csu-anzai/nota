import React from 'react';
import { Router } from '@reach/router';
import PATHS from '../shared/constants/paths';
import Home from '../home/Home';
import Read from '../read/Read';
import styled from '@emotion/styled';

const Content = () => (
  <RouterContainer>
    <Home path={PATHS.HOME} />
    <Read path={PATHS.READ} />
  </RouterContainer>
);

const RouterContainer = styled(Router)`
  height: 100%;
`;

export default Content;
