import React from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

const VerseCardVerseDisplay = ({ verse }) => (
  <VerseDisplay>{verse.text}</VerseDisplay>
);

export const VerseDisplayText = styled.div`
  padding: 0 16px;
  font-size: 20px;
  line-height: 30px;
`;

const VerseDisplay = styled(VerseDisplayText)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: ${theme.textOnPrimary};
`;

export default VerseCardVerseDisplay;