import React from 'react';
import { ReactComponent as Arrow } from 'assets/arrow.svg';
import PropTypes from 'prop-types';
import { StyledButton } from './ArrowButton.style';

const ArrowButton = ({ onClick, label }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      <Arrow /> {label}
    </StyledButton>
  );
};

export default ArrowButton;

ArrowButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
};
