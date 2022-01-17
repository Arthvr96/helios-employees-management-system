import React from 'react';
import PropTypes from 'prop-types';
import {
  ShiftWrapper,
  NumberOfShift,
  TimeShift,
  ClickableWrapper,
  DeleteButton,
} from './ShiftElemenet.style';

const ShiftElement = ({ i, shift, handleDeleteShift }) => {
  return (
    <ShiftWrapper>
      <ClickableWrapper className={`shift${i}`} />
      <DeleteButton onClick={() => handleDeleteShift(i)}>x</DeleteButton>
      <NumberOfShift>{`#${i + 1}`}</NumberOfShift>
      <TimeShift>{`${shift[0]} - ${shift[1]}`}</TimeShift>
    </ShiftWrapper>
  );
};

export default ShiftElement;

ShiftElement.propTypes = {
  i: PropTypes.number,
  shift: PropTypes.arrayOf(PropTypes.string),
  handleDeleteShift: PropTypes.func,
};
