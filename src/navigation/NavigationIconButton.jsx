import styled from '@emotion/styled';
import { Button } from '../shared/Html';
import theme from '../styles/theme';

const NavigationIconButton = styled(Button)`
  height: ${theme.topbarSize}px;
  padding: 0 12px;
  font-size: 20px;
  line-height: ${theme.topbarSize}px;
`;

export default NavigationIconButton;
