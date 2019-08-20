import React from 'react';
import Icon, { ICONS } from '../../shared/Icon';
import { ANIMATION_DURATION } from './constants';

const containerStyle = { padding: 14 };

const iconStyle = { transition: `transform ${ANIMATION_DURATION}ms ease-in-out`};

// TODO: handle click
const VerseCardHeader = ({
  iconRef,
}) => (
  <div style={containerStyle} className="draggable">
    <Icon
      icon={ICONS.ANGLE_DOWN}
      svgRef={iconRef}
      style={iconStyle}
      size={24}
    />
  </div>
);

export default VerseCardHeader;
