import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ShiftElement from 'components/molecules/ShiftElement/ShiftElement';
import uniqid from 'uniqid';
import {
  Wrapper,
  ListAddedShiftsWrapper,
  ScrollButtons,
  ScrollWrapper,
} from './ListAddedShifts.style';

const ListAddedShifts = ({ listShifts, handleDeleteShift }) => {
  const [isDisabledScroll, setDisabledScroll] = useState(true);
  const [scrollValue, setScrollValue] = useState(0);

  const handleScroll = (direction) => {
    if (direction > 0) {
      setScrollValue(scrollValue - 250);
    } else if (direction < 0) {
      setScrollValue(scrollValue + 250);
    }
  };

  useEffect(() => {
    const { width: width1 } = document.querySelector('.scrollWrapper').getBoundingClientRect();
    const { width: width2 } = document.querySelector('.list').getBoundingClientRect();

    if (width1 > width2) {
      setDisabledScroll(false);
      setScrollValue(10);
    } else {
      setDisabledScroll(true);
      setScrollValue(0);
    }
  }, [listShifts]);

  useEffect(() => {
    const { width: width1 } = document.querySelector('.scrollWrapper').getBoundingClientRect();
    const { width: width2 } = document.querySelector('.list').getBoundingClientRect();

    if (!isDisabledScroll) {
      if (scrollValue + 250 > 10) {
        setScrollValue(10);
      }
      if (scrollValue < 0) {
        if (width2 - width1 > scrollValue) {
          setScrollValue(width2 - width1 - 10);
        }
      }
    }
  }, [scrollValue, isDisabledScroll]);

  return (
    <Wrapper>
      <h4>Dodane zmiany ({listShifts.length}) : </h4>
      <ListAddedShiftsWrapper className="list">
        <ScrollButtons
          onClick={() => handleScroll(-1)}
          isDisabled={isDisabledScroll}
          isReverse
        >{`<-`}</ScrollButtons>
        <ScrollButtons
          onClick={() => handleScroll(1)}
          isDisabled={isDisabledScroll}
        >{`->`}</ScrollButtons>
        <ScrollWrapper className="scrollWrapper" scrollValue={scrollValue}>
          {listShifts.map((shift, i) => (
            <ShiftElement
              key={uniqid()}
              i={i}
              shift={shift}
              handleDeleteShift={handleDeleteShift}
            />
          ))}
        </ScrollWrapper>
      </ListAddedShiftsWrapper>
    </Wrapper>
  );
};

export default ListAddedShifts;

ListAddedShifts.propTypes = {
  listShifts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  handleDeleteShift: PropTypes.func,
};
