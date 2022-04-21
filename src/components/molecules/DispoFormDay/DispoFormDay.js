import React from 'react';
import DispoFormTypeSelect from 'components/molecules/DispoFormTypeSelect/DispoFormTypeSelect';
import DispoFormWholeDayProperties from 'components/molecules/DispoFormWholeDayProperties/DispoFormWholeDayProperties';
import DispoFormRangeProperties from 'components/molecules/DispoFormRangeProperties/DispoFormRangeProperties';
import PropTypes from 'prop-types';
import { StyledLabel } from './DispoFormDay.style';

const DispoFormDay = ({
  dayName,
  dayNumber,
  handleSetRadio,
  radioValues,
  handleSetCheckbox,
  checkBoxValues,
  handleSetRange,
  setRangeError,
  rangeValues,
  rangeError,
  isMarathon,
  isDisabled,
}) => {
  return (
    <StyledLabel isError={rangeError[dayNumber]} htmlFor={dayNumber}>
      <DispoFormTypeSelect
        handleSetRadio={handleSetRadio}
        radioValues={radioValues}
        dayNumber={dayNumber}
        dayName={dayName}
        isError={rangeError[dayNumber]}
        rangeError={rangeError}
        setRangeError={setRangeError}
        isMarathon={isMarathon}
        isDisabled={isDisabled}
      />
      {radioValues.wholeDay && !isDisabled ? (
        <DispoFormWholeDayProperties
          dayNumber={dayNumber}
          handleSetCheckbox={handleSetCheckbox}
          checkBoxValues={checkBoxValues}
          isMarathon={isMarathon}
        />
      ) : null}
      {radioValues.range && !isDisabled ? (
        <DispoFormRangeProperties
          dayNumber={dayNumber}
          handleSetRange={handleSetRange}
          rangeValues={rangeValues}
          rangeError={rangeError}
          setRangeError={setRangeError}
        />
      ) : null}
    </StyledLabel>
  );
};

export default DispoFormDay;

DispoFormDay.propTypes = {
  dayName: PropTypes.string.isRequired,
  dayNumber: PropTypes.string.isRequired,
  handleSetRange: PropTypes.func.isRequired,
  handleSetCheckbox: PropTypes.func.isRequired,
  setRangeError: PropTypes.func.isRequired,
  handleSetRadio: PropTypes.func.isRequired,
  radioValues: PropTypes.objectOf(PropTypes.bool),
  rangeError: PropTypes.objectOf(PropTypes.bool),
  checkBoxValues: PropTypes.objectOf(PropTypes.bool),
  rangeValues: PropTypes.objectOf(PropTypes.string),
  isMarathon: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
