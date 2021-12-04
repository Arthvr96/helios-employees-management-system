import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Arrow } from 'assets/arrow.svg';
import { Wrapper } from './ArrowIcone.style';

export const ArrowIcone = ({ isRotate, isReversed }) => {
  return (
    <Wrapper isRotate={isRotate} isReversed={isReversed}>
      <Arrow />
    </Wrapper>
  );
};

ArrowIcone.propTypes = {
  isRotate: PropTypes.bool,
  isReversed: PropTypes.bool,
};
