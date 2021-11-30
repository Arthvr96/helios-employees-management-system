import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'components/molecues/ToggleButton/ToggleButton';
import { ActiveWorkplaceWrapper } from './ActiveWorkplace.style';

const ActiveWorkplace = ({ buttonState, setButtonState }) => {
  return (
    <ActiveWorkplaceWrapper>
      <h4>Stanowisko aktywne/nieaktywne : </h4>
      <ToggleButton buttonState={buttonState} setButtonState={setButtonState} />
    </ActiveWorkplaceWrapper>
  );
};

export default ActiveWorkplace;

ActiveWorkplace.propTypes = {
  buttonState: PropTypes.bool,
  setButtonState: PropTypes.func,
};
