import React from 'react';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import WrapperClickableEl from 'components/atoms/WrapperClickableEl/WrapperClickableEl';
import { Wrapper } from './DispoFormTypeSelect.style';

const radioButtons = [
  ['wolne', 'freeDay'],
  ['całka', 'wholeDay'],
  ['zakres', 'range'],
];

const DispoFormTypeSelect = ({ radioValues, handleSetRadio, dayName, dayNumber, isError }) => {
  return (
    <Wrapper isError={isError} freeDaySelected={radioValues.freeDay}>
      <h3>{dayName}</h3>
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
};
