import React, { useEffect, useState } from 'react';
import { initCheckbox, initRadio, initRanges } from 'components/organisms/DispoForm/helpers';
import DispoFormDay from 'components/molecules/DispoFormDay/DispoFormDay';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import { Button } from 'components/atoms/Button/Button';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import PropTypes from 'prop-types';
import { Wrapper, StyledForm } from './DispoForm.style';

const DispoForm = ({ handleSwitchPage }) => {
  const { appState } = useAuth();
  const [days, setDays] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [radioValues, setRadioValues] = useState(initRadio);
  const [checkBoxValues, setCheckBoxValues] = useState(initCheckbox);
  const [rangeValues, setRangeValues] = useState(initRanges);

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

    const getValues = (day, selectedOption) => {
      if (selectedOption === 'freeDay') {
        return null;
      }
      if (selectedOption === 'wholeDay') {
        if (checkBoxValues[day].wholeDayPlus && checkBoxValues[day].marathon) {
          return ['8', '26', 'wholeDayPlus', 'marathon'];
        }
        if (checkBoxValues[day].wholeDayPlus) {
          return ['8', '26', 'wholeDayPlus', ''];
        }
        if (checkBoxValues[day].marathon) {
          return ['8', '26', '', 'marathon'];
        }
        return ['8', '26', '', ''];
      }
      if (selectedOption === 'range') {
        return [rangeValues[day].from, rangeValues[day].to];
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

    setInProgress(true);
    setTimeout(() => {
      window.alert(JSON.stringify(values));
      handleSwitchPage('toDispoDashboard');
    }, 300);
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
    const { date1, date2 } = appState;
    setDays([...getArrDays(date1, date2)]);
  }, []);

  return (
    <StyledForm onSubmit={onSubmit}>
      {days.map((day, i) => (
        <DispoFormDay
          key={day}
          handleSetRange={handleSetRange}
          handleSetCheckbox={handleSetCheckbox}
          handleSetRadio={handleSetRadio}
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
          <Button type="submit">Zapisz</Button>
        </Wrapper>
      )}
    </StyledForm>
  );
};

export default DispoForm;

DispoForm.propTypes = {
  handleSwitchPage: PropTypes.func.isRequired,
};
