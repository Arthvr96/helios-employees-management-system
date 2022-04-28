import React from 'react';
import PropTypes from 'prop-types';
import { ButtonActive } from './ToggleButton.style';

const ToggleButton = ({ type = 'button', state, onClick }) => {
  return (
    <ButtonActive type={type} state={state} onClick={onClick}>
      <span>{state ? 'ON' : 'OFF'}</span>
    </ButtonActive>
  );
};

export default ToggleButton;

ToggleButton.propTypes = {
  type: PropTypes.string,
  state: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
