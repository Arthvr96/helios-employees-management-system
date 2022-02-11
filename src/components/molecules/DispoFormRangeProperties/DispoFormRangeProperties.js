import React from 'react';
import PropTypes from 'prop-types';
import { PropertiesWrapper } from 'components/atoms/PropertiesWrapper/PropertiesWrapper';

export const Options = [
  [9, '9:00'],
  [9.5, '9:30'],
  [10, '10:00'],
  [10.5, '10:30'],
  [11, '11:00'],
  [11.5, '11:30'],
  [12, '12:00'],
  [12.5, '12:30'],
  [13, '13:00'],
  [13.5, '13:30'],
  [14, '14:00'],
  [14.5, '14:30'],
  [15, '15:00'],
  [15.5, '15:30'],
  [16, '16:00'],
  [16.5, '16:30'],
  [17, '17:00'],
  [17.5, '17:30'],
  [18, '18:00'],
  [18.5, '18:30'],
  [19, '19:00'],
  [19.5, '19:30'],
  [20, '20:00'],
  [20.5, '20:30'],
  [21, '21:00'],
  [21.5, '21:30'],
  [22, '22:00'],
  [22.5, '22:30'],
];

const DispoFormRangeProperties = ({ rangeValues, handleSetRange, dayNumber }) => {
  return (
    <PropertiesWrapper>
      <span>
        od:
        <select
          value={rangeValues.from}
          onChange={(e) => handleSetRange(dayNumber, 'from', e.target.value)}
        >
          <option value="8">obojetnie</option>
          {Options.map((option) => (
            <option key={option[1]} value={option[0]}>
              {option[1]}
            </option>
          ))}
        </select>
      </span>
      <span className="disabled">
        do:
        <select
          value={rangeValues.to}
          onChange={(e) => handleSetRange(dayNumber, 'to', e.target.value)}
        >
          <option value="30">obojętnie</option>
          {Options.map((option) => (
            <option key={option[1]} value={option[0]}>
              {option[1]}
            </option>
          ))}
        </select>
      </span>
    </PropertiesWrapper>
  );
};

export default DispoFormRangeProperties;

DispoFormRangeProperties.propTypes = {
  rangeValues: PropTypes.objectOf(PropTypes.string),
  handleSetRange: PropTypes.func.isRequired,
  dayNumber: PropTypes.string.isRequired,
};
