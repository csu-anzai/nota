import React from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

const VerseCardVerseDisplay = () => (
  <VerseDisplay>
    The man’s name was Elimelech, and his wife’s name was Naomi. The names of his two sons were Mahlon and Chilion. They were Ephrathites from Bethlehem in Judah. They entered the land of Moab and settled there.
  </VerseDisplay>
);

const VerseDisplay = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  padding: 16px;
  font-size: 1.4em;
  color: ${theme.textOnPrimary};
`;

export default VerseCardVerseDisplay;