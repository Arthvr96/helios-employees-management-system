import React from 'react';
import PropTypes from 'prop-types';
import { Select } from './InputSelect.style';

const InputSelect = ({
  defaultOption = 'Wybierz cykl',
  value,
  handleChange,
  options,
  margin,
  width,
}) => {
  return (
    <Select
      width={width}
      margin={margin}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option disabled value="default">
        {defaultOption}
      </option>
      {options
        ? options.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))
        : null}
    </Select>
  );
};

export default InputSelect;

InputSelect.propTypes = {
  width: PropTypes.string,
  defaultOption: PropTypes.string,
  margin: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
};
