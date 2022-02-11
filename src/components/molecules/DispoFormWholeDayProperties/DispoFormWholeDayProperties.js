import React from 'react';
import WrapperClickableEl from 'components/atoms/WrapperClickableEl/WrapperClickableEl';
import { PropertiesWrapper } from 'components/atoms/PropertiesWrapper/PropertiesWrapper';
import PropTypes from 'prop-types';

const DispoFormWholeDayProperties = ({ checkBoxValues, handleSetCheckbox, dayNumber }) => {
  return (
    <PropertiesWrapper>
      <span>
        <WrapperClickableEl>
          całka + :
          <input
            className="clickable"
            checked={checkBoxValues.wholeDayPlus}
            onChange={() => handleSetCheckbox(dayNumber, 'wholeDayPlus')}
            type="checkbox"
          />
        </WrapperClickableEl>
      </span>

      <span>
        <WrapperClickableEl isDisabled>
          maraton :
          <input
            className="clickable"
            checked={checkBoxValues.marathon}
            onChange={() => handleSetCheckbox(dayNumber, 'marathon')}
            type="checkbox"
            disabled
          />
        </WrapperClickableEl>
      </span>
    </PropertiesWrapper>
  );
};

export default DispoFormWholeDayProperties;

DispoFormWholeDayProperties.propTypes = {
  checkBoxValues: PropTypes.objectOf(PropTypes.bool),
  handleSetCheckbox: PropTypes.func.isRequired,
  dayNumber: PropTypes.string.isRequired,
};