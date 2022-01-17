import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, AddNewShiftButton } from './NewShfitButton.style';

const NewShiftButton = ({ activeNewShift, setActiveNewShift }) => {
  return (
    <Wrapper>
      <AddNewShiftButton onClick={!activeNewShift ? () => setActiveNewShift(true) : null}>
        +
      </AddNewShiftButton>
    </Wrapper>
  );
};

export default NewShiftButton;

NewShiftButton.propTypes = {
  activeNewShift: PropTypes.bool,
  setActiveNewShift: PropTypes.func,
};
