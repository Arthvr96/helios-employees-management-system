import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, ShiftWrapper, ShiftInfo, ShiftTitle, DeleteButton } from './ShiftItem.style';

const ShiftItem = ({ isMarathon, isNight, name, time, onDelete, onEdit }) => {
  return (
    <Wrapper>
      <ShiftWrapper onClick={onEdit} type="button" isNight={isNight} isMarathon={isMarathon}>
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
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isMarathon: PropTypes.bool,
  isNight: PropTypes.bool,
};
