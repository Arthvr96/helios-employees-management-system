import React from 'react';
import PropTypes from 'prop-types';
import { ButtonActive } from './ToggleButton.style';

const ToggleButton = ({ buttonState, setButtonState }) => {
  return (
    <ButtonActive
      state={buttonState}
      onClick={() => {
        setButtonState(!buttonState);
      }}
    >
      <span>{buttonState ? 'ON' : 'OFF'}</span>
    </ButtonActive>
  );
};

export default ToggleButton;

ToggleButton.propTypes = {
  buttonState: PropTypes.bool.isRequired,
  setButtonState: PropTypes.func.isRequired,
};
