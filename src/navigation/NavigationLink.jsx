import styled from '@emotion/styled';
import { NavLink } from 'redux-first-router-link';
import theme from '../styles/theme';

const NavigationLink = styled(NavLink)`
  display: block;
  padding: 12px 16px;
  text-decoration: none;
  font-size: 18px;
  color: ${theme.blank};

  &.active {
    background-color: ${theme.primary};
  }
`;

export default NavigationLink;
