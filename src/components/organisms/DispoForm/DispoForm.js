import React, { useEffect, useState } from 'react';
import {
  initCheckbox,
  initRadio,
  initRangeErrors,
  initRanges,
} from 'components/organisms/DispoForm/helpers';
import DispoFormDay from 'components/molecules/DispoFormDay/DispoFormDay';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import { Button } from 'components/atoms/Button/Button';
import PropTypes from 'prop-types';
import { dispositionSortedEmployeesFunctions } from 'functions/dispositionSortedEmployeesFunctions';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import { Wrapper, StyledForm } from './DispoForm.style';

const DispoForm = ({ handleSwitchPage, cycleData, setCycleData }) => {
  const { currentUser, appState } = useGlobalState();
  const [days, setDays] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [radioValues, setRadioValues] = useState(initRadio);
  const [checkBoxValues, setCheckBoxValues] = useState(initCheckbox);
  const [rangeValues, setRangeValues] = useState(initRanges);
  const [rangeError, setRangeError] = useState(initRangeErrors);
  const [blockSubmitting, setBlockSubmitting] = useState(false);
  const { updateDisposition } = dispositionSortedEmployeesFunctions();

  const handleSetRadio = (day, nameRadio) => {
    setRadioValues({
      ...radioValues,
      [day]: {
        freeDay: false,
        wholeDay: false,
        range: false,
        [nameRadio]: !radioValues[day][nameRadio],
      },
    });
  };

  const handleSetRange = (day, nameRange, value) => {
    setRangeValues({
      ...rangeValues,
      [day]: {
        ...rangeValues[day],
        [nameRange]: value,
      },
    });
  };
  const handleSetCheckbox = (day, nameCheckbox) => {
    setCheckBoxValues({
      ...checkBoxValues,
      [day]: {
        ...checkBoxValues[day],
        [nameCheckbox]: !checkBoxValues[day][nameCheckbox],
      },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!blockSubmitting) {
      setInProgress(true);
      const getValues = (day, selectedOption) => {
        if (selectedOption === 'freeDay') {
          return ['freeDay', '8', '30', false, false];
        }
        if (selectedOption === 'wholeDay') {
          if (checkBoxValues[day].wholeDayPlus && checkBoxValues[day].marathon) {
            return ['wholeDay', '8', '30', true, true];
          }
          if (checkBoxValues[day].wholeDayPlus) {
            return ['wholeDay', '8', '30', true, false];
          }
          if (checkBoxValues[day].marathon) {
            return ['wholeDay', '8', '30', false, true];
          }
          return ['wholeDay', '8', '30', false, false];
        }
        if (selectedOption === 'range') {
          return ['range', rangeValues[day].from, rangeValues[day].to, false, false];
        }
        return null;
      };

      const values = {};
      for (const key in radioValues) {
        if ({}.hasOwnProperty.call(radioValues, key)) {
          for (const keyNested in radioValues[key]) {
            if ({}.hasOwnProperty.call(radioValues, key)) {
              if (radioValues[key][keyNested]) {
                values[key] = getValues(key, keyNested);
              }
            }
          }
        }
      }
      const comparison = { status: true };

      for (const key in values) {
        if ({}.hasOwnProperty.call(radioValues, key)) {
          values[key].forEach((value, i) => {
            if (value !== cycleData[key][i]) {
              comparison.status = false;
            }
          });
        }
      }

      if (!comparison.status) {
        const cycleId = `${appState.date1}-${appState.date2}`;
        updateDisposition(currentUser.id, cycleId, values)
          .then(() => {
            setCycleData(values);
            handleSwitchPage('toDispoDashboard');
          })
          .catch((error) => {
            window.alert(error.code);
          });
      } else {
        handleSwitchPage('toDispoDashboard');
      }
    }
  };

  const getArrDays = (date1, date2) => {
    const getDaysArray = (s, e) => {
      const a = [];
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        a.push(new Date(d));
      }
      return a;
    };

    function getDayName(dateStr, locale) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(locale, { weekday: 'long' });
    }

    const dayListString = getDaysArray(new Date(date1), new Date(date2));
    const dayListArr = dayListString.map((v) => v.toISOString().slice(0, 10));

    const daysName = [];
    dayListArr.forEach((day) => {
      daysName.push(getDayName(day, 'pl-PL'));
    });

    const completeArr = [];
    dayListArr.forEach((dayDate, i) => {
      const text = `${daysName[i]} ${dayDate.slice(5, 10).replace('-', '.')}`;
      completeArr.push(text);
    });
    return completeArr;
  };

  useEffect(() => {
    // after set free day from another state, reset range values
    const obj = {
      ...rangeValues,
    };
    const obj2 = {
      ...rangeError,
    };
    for (const key in radioValues) {
      if ({}.hasOwnProperty.call(radioValues, key)) {
        if (radioValues[key].freeDay === true) {
          obj[key] = {
            from: '8',
            to: '30',
          };
          obj2[key] = false;
        }
      }
    }
    setRangeValues({ ...obj });
    setRangeError({ ...obj2 });
  }, [radioValues]);

  useEffect(() => {
    const arr = Object.values(rangeError);
    let status = false;
    arr.forEach((el) => {
      if (el) {
        status = true;
      }
    });
    setBlockSubmitting(status);
  }, [rangeError]);

  useEffect(() => {
    const { date1, date2 } = appState;
    setDays([...getArrDays(date1, date2)]);
  }, []);

  useEffect(() => {
    const syncRadioValues = () => {
      const obj = JSON.parse(JSON.stringify(radioValues));
      for (const key in cycleData) {
        if ({}.hasOwnProperty.call(cycleData, key)) {
          const type = cycleData[key][0];
          const newSet = {
            freeDay: false,
            wholeDay: false,
            range: false,
            [type]: true,
          };
          obj[key] = { ...newSet };
        }
      }
      setRadioValues(JSON.parse(JSON.stringify(obj)));
    };

    const syncRangeValues = () => {
      const obj = JSON.parse(JSON.stringify(rangeValues));
      for (const key in cycleData) {
        if ({}.hasOwnProperty.call(cycleData, key)) {
          obj[key].from = `${cycleData[key][1]}`;
          obj[key].to = `${cycleData[key][2]}`;
        }
      }
      setRangeValues(JSON.parse(JSON.stringify(obj)));
    };

    const syncCheckBoxValues = () => {
      const obj = JSON.parse(JSON.stringify(checkBoxValues));
      for (const key in cycleData) {
        if ({}.hasOwnProperty.call(cycleData, key)) {
          const wholeDayPlus = cycleData[key][3];
          const marathon = cycleData[key][4];
          obj[key].wholeDayPlus = wholeDayPlus;
          obj[key].marathon = marathon;
        }
      }
      setCheckBoxValues(JSON.parse(JSON.stringify(obj)));
    };

    if (cycleData) {
      syncRadioValues();
      syncRangeValues();
      syncCheckBoxValues();
    }
  }, [cycleData]);

  return (
    <StyledForm onSubmit={onSubmit}>
      {days.map((day, i) => (
        <DispoFormDay
          key={day}
          handleSetRange={handleSetRange}
          handleSetCheckbox={handleSetCheckbox}
          handleSetRadio={handleSetRadio}
          setRangeError={setRangeError}
          rangeError={rangeError}
          dayName={day}
          dayNumber={`day${i + 1}`}
          rangeValues={rangeValues[`day${i + 1}`]}
          checkBoxValues={checkBoxValues[`day${i + 1}`]}
          radioValues={radioValues[`day${i + 1}`]}
        />
      ))}

      {inProgress ? (
        <Wrapper>
          <LoaderRing colorVariant2 />
        </Wrapper>
      ) : (
        <Wrapper margin="1.5rem 0 0 0">
          <Button
            className="first"
            isCancel
            type="button"
            onClick={() => handleSwitchPage('toDispoDashboard')}
          >
            Anuluj
          </Button>
          <Button disabled={blockSubmitting} type="submit">
            Zapisz
          </Button>
        </Wrapper>
      )}
    </StyledForm>
  );
};

export default DispoForm;

DispoForm.propTypes = {
  setCycleData: PropTypes.func.isRequired,
  handleSwitchPage: PropTypes.func.isRequired,
  cycleData: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  ),
};
