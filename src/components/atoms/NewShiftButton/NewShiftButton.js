import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './NewShiftButton.style';

const NewShiftButton = ({ onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      +
    </StyledButton>
  );
};

export default NewShiftButton;

NewShiftButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
