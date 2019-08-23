import RouterLink from 'redux-first-router-link';
import styled from '@emotion/styled';
import theme from '../styles/theme';

const Link = styled(RouterLink)`
  color: ${theme.primary};
`;

export default Link;
