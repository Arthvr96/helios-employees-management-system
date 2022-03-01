import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { PropertiesWrapper } from 'components/atoms/PropertiesWrapper/PropertiesWrapper';
import { ErrorMsg } from 'components/atoms/ErrorMsg/ErrorMsg';

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

const DispoFormRangeProperties = ({
  rangeValues,
  handleSetRange,
  dayNumber,
  setRangeError,
  rangeError,
}) => {
  const [error, setError] = useState('');
  const refFromInput = useRef(null);
  const refToInput = useRef(null);

  const validation = () => {
    const handeSetError = (isError, errorMsg) => {
      if (isError) {
        setRangeError({
          ...rangeError,
          [dayNumber]: true,
        });
        setError(errorMsg);
      } else if (!isError) {
        setError('');
        setRangeError({
          ...rangeError,
          [dayNumber]: false,
        });
      }
    };
    const from = refFromInput.current.value;
    const to = refToInput.current.value;

    if (from === 'disabled' || to === 'disabled') {
      handeSetError(true, `Wybierz zakres`);
    } else if (parseFloat(from) >= parseFloat(to)) {
      handeSetError(true, `'od' nie może być mniejsze/równe niż 'do'`);
    } else if (parseFloat(from) === 8 && parseFloat(to) === 30) {
      handeSetError(true, `Obie wartości nie mogą być 'obojętnie'`);
    } else {
      handeSetError(false);
    }
  };

  useEffect(() => {
    validation();
  }, []);

  return (
    <PropertiesWrapper flexDirection="column">
      {error ? <ErrorMsg>{error}</ErrorMsg> : null}
      <div>
        <span>
          od:
          <select
            ref={refFromInput}
            className="fromInput"
            value={rangeValues.from}
            onChange={(e) => {
              handleSetRange(dayNumber, 'from', e.target.value);
              validation();
            }}
          >
            <option disabled value="disabled">
              -
            </option>
            <option value="8">obojetnie</option>
            {Options.map((option) => (
              <option key={option[1]} value={option[0]}>
                {option[1]}
              </option>
            ))}
          </select>
        </span>
        <span>
          do:
          <select
            ref={refToInput}
            className="toInput"
            value={rangeValues.to}
            onChange={(e) => {
              handleSetRange(dayNumber, 'to', e.target.value);
              validation();
            }}
          >
            <option disabled value="disabled">
              -
            </option>
            <option value="30">obojętnie</option>
            {Options.map((option) => (
              <option key={option[1]} value={option[0]}>
                {option[1]}
              </option>
            ))}
          </select>
        </span>
      </div>
    </PropertiesWrapper>
  );
};

export default DispoFormRangeProperties;

DispoFormRangeProperties.propTypes = {
  rangeValues: PropTypes.objectOf(PropTypes.string),
  handleSetRange: PropTypes.func.isRequired,
  rangeError: PropTypes.objectOf(PropTypes.bool),
  setRangeError: PropTypes.func.isRequired,
  dayNumber: PropTypes.string.isRequired,
};
