import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Arrow } from 'assets/arrow.svg';
import { Wrapper } from './ArrowIcon.style';

export const ArrowIcon = ({ isRotate, isReversed }) => {
  return (
    <Wrapper isRotate={isRotate} isReversed={isReversed}>
      <Arrow />
    </Wrapper>
  );
};

ArrowIcon.propTypes = {
  isRotate: PropTypes.bool,
  isReversed: PropTypes.bool,
};
