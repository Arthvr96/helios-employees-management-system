import React from 'react';
import PropTypes from 'prop-types';
import { Select } from './InputSelect.style';

const InputSelect = ({ value, handleChange, values, margin }) => {
  return (
    <Select margin={margin} value={value} onChange={(e) => handleChange(e.target.value)}>
      <option disabled value="selectCycle">
        Wybierz cykl
      </option>
      {values
        ? values.map((el) => (
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
  margin: PropTypes.string,
  value: PropTypes.string,
  handleChange: () => {},
  values: PropTypes.arrayOf(PropTypes.string),
};
