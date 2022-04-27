import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, ShiftWrapper, ShiftInfo, ShiftTitle, DeleteButton } from './ShiftItem.style';

const ShiftItem = ({ name, time, onDelete }) => {
  return (
    <Wrapper>
      <ShiftWrapper type="button">
        <ShiftTitle>{name}</ShiftTitle>
        <ShiftInfo>{time}</ShiftInfo>
      </ShiftWrapper>
      <DeleteButton type="button" onClick={onDelete}>
        X
      </DeleteButton>
    </Wrapper>
  );
};

export default ShiftItem;

ShiftItem.propTypes = {
  onDelete: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
