import React, { useEffect, useState } from 'react';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import PropTypes from 'prop-types';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import { Wrapper } from './MarathonPicker.style';

const MarathonPicker = ({ date1, date2, checkboxValues, setCheckboxValues }) => {
  const { getArrDays } = HeliosAppSdk.__helpers__;
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (date1 && date2) {
      const arr = getArrDays(date1, date2);
      if (arr.length === 7) {
        setDays(arr);
      }
    }
  }, []);

  const handleChange = (e, name) => {
    setCheckboxValues({ ...checkboxValues, [name]: !checkboxValues[name] });
  };

  return (
    <Wrapper>
      {days.map((day, i) => (
        <div key={day}>
          {day} :
          <InputForm
            checked={checkboxValues[`day${i + 1}`]}
            margin="0rem"
            width="1.5rem"
            height="1.5rem"
            type="checkbox"
            onChange={(e) => handleChange(e, `day${i + 1}`)}
          />
        </div>
      ))}
    </Wrapper>
  );
};

export default MarathonPicker;

MarathonPicker.propTypes = {
  date1: PropTypes.string.isRequired,
  date2: PropTypes.string.isRequired,
  checkboxValues: PropTypes.objectOf(PropTypes.bool).isRequired,
  setCheckboxValues: PropTypes.func.isRequired,
};
