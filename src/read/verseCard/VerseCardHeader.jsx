import React from 'react';
import Icon, { ICONS } from '../../shared/Icon';
import { ANIMATION_DURATION } from './constants';

const iconStyle = { transition: `transform ${ANIMATION_DURATION}ms ease-in-out`};

// TODO: handle click
const VerseCardHeader = ({
  iconRef,
}) => (
  <div style={{ padding: 14 }}>
    <Icon
      icon={ICONS.ANGLE_DOWN}
      svgRef={iconRef}
      style={iconStyle}
      size={24}
    />
  </div>
);

export default VerseCardHeader;
