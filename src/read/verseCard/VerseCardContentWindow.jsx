import React from 'react';
import styled from '@emotion/styled';
import { VerseDisplayText } from './VerseCardVerseDisplay';

const VerseCardContentWindow = ({ verse }) => (
  <VerseCardWindow>{verse.text}</VerseCardWindow>
)

const VerseCardWindow = styled(VerseDisplayText)`
  visibility: hidden;
  margin-bottom: 24px;
`;

export default VerseCardContentWindow;
