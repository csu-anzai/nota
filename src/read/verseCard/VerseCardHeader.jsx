import React from 'react';
import Icon, { ICONS } from '../../shared/Icon';
import { ANIMATION_DURATION } from './constants';
import { Button } from '../../shared/Html';
import styled from '@emotion/styled';

const iconStyle = { transition: `transform ${ANIMATION_DURATION}ms ease-in-out`};

const VerseCardHeader = ({
  verse,
  iconRef,
  handleClick,
}) => (
  <div className="draggable">
    <VerseTitleButton
      type="button"
      onClick={handleClick}
      className="draggable"
    >
      <Icon
        icon={ICONS.ANGLE_DOWN}
        svgRef={iconRef}
        style={iconStyle}
        size={24}
      />
      {verse.title}
    </VerseTitleButton>
  </div>
);

const VerseTitleButton = styled(Button)`
  font-size: 18px;
  font-weight: 500;
  padding: 14px;

  svg {
    margin-right: 6px;
    margin-top: -4px;
  }
`;

export default VerseCardHeader;
