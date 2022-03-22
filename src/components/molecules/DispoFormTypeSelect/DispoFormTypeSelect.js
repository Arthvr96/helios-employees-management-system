import React from 'react';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import WrapperClickableEl from 'components/atoms/WrapperClickableEl/WrapperClickableEl';
import { Wrapper } from './DispoFormTypeSelect.style';

const radioButtons = [
  ['wolne', 'freeDay'],
  ['C', 'wholeDay'],
  ['zakres', 'range'],
];

const DispoFormTypeSelect = ({
  radioValues,
  handleSetRadio,
  dayName,
  dayNumber,
  isError,
  rangeError,
  setRangeError,
  isMarathon,
}) => {
  const handleSetError = (day, radioButton) => {
    if (radioButton === 'range' && !radioValues.range) {
      setRangeError({
        ...rangeError,
        [day]: true,
      });
    }
  };
  return (
    <Wrapper isError={isError} freeDaySelected={radioValues.freeDay}>
      <h3>{isMarathon ? `${dayName} (M)` : dayName}</h3>
      <ul>
        {radioButtons.map((radioButton) => (
          <li key={uniqid()}>
            <WrapperClickableEl>
              {`${radioButton[0]} - `}
              <input
                className="clickable"
                type="radio"
                checked={radioValues[radioButton[1]]}
                onChange={() => {
                  handleSetRadio(dayNumber, radioButton[1]);
                }}
                onClick={() => handleSetError(dayNumber, radioButton[1])}
              />
            </WrapperClickableEl>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default DispoFormTypeSelect;

DispoFormTypeSelect.propTypes = {
  radioValues: PropTypes.objectOf(PropTypes.bool),
  handleSetRadio: PropTypes.func.isRequired,
  dayName: PropTypes.string.isRequired,
  dayNumber: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  rangeError: PropTypes.objectOf(PropTypes.bool),
  setRangeError: PropTypes.func.isRequired,
  isMarathon: PropTypes.bool.isRequired,
};
