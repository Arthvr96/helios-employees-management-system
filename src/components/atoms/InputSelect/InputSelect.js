import React from 'react';
import PropTypes from 'prop-types';
import { Select } from './InputSelect.style';

const InputSelect = ({
  defaultOption = 'Wybierz cykl',
  value,
  handleChange,
  options,
  options2,
  margin,
  width,
  disabled,
  isError,
  id,
  name,
  graphShapeId,
}) => {
  return (
    <Select
      id={id}
      name={name}
      disabled={disabled}
      width={width}
      margin={margin}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      isError={isError}
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
      {options2
        ? options2.map((el) => (
            <option key={el.id} value={el.id} disabled={el.id === graphShapeId}>
              {el.name}
            </option>
          ))
        : null}
    </Select>
  );
};

export default InputSelect;

InputSelect.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.string,
  defaultOption: PropTypes.string,
  margin: PropTypes.string,
  graphShapeId: PropTypes.string,
  handleChange: PropTypes.func,
  isError: PropTypes.bool,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  options2: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};
