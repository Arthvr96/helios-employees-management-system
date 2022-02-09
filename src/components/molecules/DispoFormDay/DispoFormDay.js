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
  rangeValues,
}) => {
  return (
    <StyledLabel htmlFor={dayNumber}>
      <DispoFormTypeSelect
        handleSetRadio={handleSetRadio}
        radioValues={radioValues}
        dayNumber={dayNumber}
        dayName={dayName}
      />
      {radioValues.wholeDay ? (
        <DispoFormWholeDayProperties
          dayNumber={dayNumber}
          handleSetCheckbox={handleSetCheckbox}
          checkBoxValues={checkBoxValues}
        />
      ) : null}
      {radioValues.range ? (
        <DispoFormRangeProperties
          dayNumber={dayNumber}
          handleSetRange={handleSetRange}
          rangeValues={rangeValues}
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
  handleSetRadio: PropTypes.func.isRequired,
  radioValues: PropTypes.objectOf(PropTypes.bool),
  checkBoxValues: PropTypes.objectOf(PropTypes.bool),
  rangeValues: PropTypes.objectOf(PropTypes.string),
};
