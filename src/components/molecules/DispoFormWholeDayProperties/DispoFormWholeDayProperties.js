import React from 'react';
import WrapperClickableEl from 'components/atoms/WrapperClickableEl/WrapperClickableEl';
import { PropertiesWrapper } from 'components/atoms/PropertiesWrapper/PropertiesWrapper';
import PropTypes from 'prop-types';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';

const DispoFormWholeDayProperties = ({ checkBoxValues, handleSetCheckbox, dayNumber }) => {
  const { appState } = useGlobalState();
  return (
    <PropertiesWrapper>
      <span>
        <WrapperClickableEl>
          całka (C+/total) :
          <input
            className="clickable"
            checked={checkBoxValues.wholeDayPlus}
            onChange={() => handleSetCheckbox(dayNumber, 'wholeDayPlus')}
            type="checkbox"
          />
        </WrapperClickableEl>
      </span>

      <span>
        <WrapperClickableEl isDisabled={!appState.marathon[dayNumber]}>
          maraton :
          <input
            className="clickable"
            checked={checkBoxValues.marathon}
            onChange={() => handleSetCheckbox(dayNumber, 'marathon')}
            type="checkbox"
            disabled={!appState.marathon[dayNumber]}
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
