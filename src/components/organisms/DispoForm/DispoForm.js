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
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { Textarea } from 'components/atoms/Textarea/Textarea';
import LoadingScreen from 'components/molecules/LoadingScreen/LoadingScreen';
import { Wrapper, StyledForm, MessageButton } from './DispoForm.style';

const DispoForm = ({ handleSwitchPage, cycleData, setCycleData }) => {
  const { currentUser, appState, settings } = useGlobalState();
  const [days, setDays] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [radioValues, setRadioValues] = useState(initRadio);
  const [checkBoxValues, setCheckBoxValues] = useState(initCheckbox);
  const [rangeValues, setRangeValues] = useState(initRanges);
  const [rangeError, setRangeError] = useState(initRangeErrors);
  const [messageDisplay, setMessageDisplay] = useState(true);
  const [messageValue, setMessageValue] = useState('');
  const [blockSubmitting, setBlockSubmitting] = useState(false);
  const { updateEmployeeDisposition } = HeliosAppSdk.firestore;
  const { handleSendEmail, generateBodyFromDispo } = HeliosAppSdk.emailProvider;
  const { getArrDays } = HeliosAppSdk.__helpers__;

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
    setInProgress(true);
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
            if (value !== cycleData.disposition[key][i]) {
              comparison.status = false;
            }
          });
        }
      }

      if (cycleData.message !== messageValue) {
        comparison.status = false;
      }

      if (!comparison.status) {
        const obj = {
          disposition: JSON.parse(JSON.stringify(values)),
          message: messageValue,
        };
        const cycleId = `${appState.date1}-${appState.date2}`;
        updateEmployeeDisposition(currentUser.id, cycleId, obj)
          .then(() => {
            setCycleData(obj);
            const mail = generateBodyFromDispo(
              currentUser,
              appState,
              obj.disposition,
              obj.message,
              days,
            );
            return handleSendEmail(settings.dispoCopy, mail.subject, mail.message);
          })
          .then(() => {
            handleSwitchPage('toDispoDashboard');
          })
          .catch((error) => {
            handleSwitchPage('toDispoDashboard');
            window.alert(error.code);
          });
      } else {
        setInProgress(false);
        handleSwitchPage('toDispoDashboard');
      }
    }
  };

  useEffect(() => {
    // after set free day from another state, reset range values
    const obj = {
      ...rangeValues,
    };
    const obj2 = {
      ...rangeError,
    };

    const obj3 = {
      ...checkBoxValues,
    };

    for (const key in radioValues) {
      if ({}.hasOwnProperty.call(radioValues, key)) {
        if (radioValues[key].freeDay === true) {
          obj[key] = {
            from: 'disabled',
            to: 'disabled',
          };
          obj2[key] = false;
          obj3[key].wholeDayPlus = false;
          obj3[key].marathon = false;
        }
        if (radioValues[key].wholeDay === true) {
          obj[key] = {
            from: 'disabled',
            to: 'disabled',
          };
          obj2[key] = false;
        }
        if (radioValues[key].range === true) {
          obj3[key].wholeDayPlus = false;
          obj3[key].marathon = false;
        }
      }
    }
    setRangeValues({ ...obj });
    setRangeError({ ...obj2 });
    setCheckBoxValues({ ...obj3 });
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
      for (const key in cycleData.disposition) {
        if ({}.hasOwnProperty.call(cycleData.disposition, key)) {
          const type = cycleData.disposition[key][0];
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
      for (const key in cycleData.disposition) {
        if ({}.hasOwnProperty.call(cycleData.disposition, key)) {
          obj[key].from = `${cycleData.disposition[key][1]}`;
          obj[key].to = `${cycleData.disposition[key][2]}`;
        }
      }
      setRangeValues(JSON.parse(JSON.stringify(obj)));
    };

    const syncCheckBoxValues = () => {
      const obj = JSON.parse(JSON.stringify(checkBoxValues));
      for (const key in cycleData.disposition) {
        if ({}.hasOwnProperty.call(cycleData.disposition, key)) {
          const wholeDayPlus = cycleData.disposition[key][3];
          const marathon = cycleData.disposition[key][4];
          obj[key].wholeDayPlus = wholeDayPlus;
          obj[key].marathon = marathon;
        }
      }
      setCheckBoxValues(JSON.parse(JSON.stringify(obj)));
    };

    if (cycleData.disposition) {
      syncRadioValues();
      syncRangeValues();
      syncCheckBoxValues();
    }
    if (cycleData.message) {
      setMessageValue(cycleData.message);
    }
  }, [cycleData]);

  return (
    <>
      <LoadingScreen isVisible={inProgress} />
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
        <MessageButton
          isOpen={messageDisplay}
          onClick={() => setMessageDisplay(!messageDisplay)}
          type="button"
          error={messageValue.length > 425}
        >
          Komentarz do dyspozycji<span>{` (${messageValue.length}/500)`}</span>
        </MessageButton>
        {messageDisplay ? (
          <Textarea
            maxLength={500}
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          />
        ) : null}

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
    </>
  );
};

export default DispoForm;

DispoForm.propTypes = {
  setCycleData: PropTypes.func.isRequired,
  handleSwitchPage: PropTypes.func.isRequired,
  cycleData: PropTypes.shape({
    message: PropTypes.string,
    disposition: PropTypes.objectOf(
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
    ),
  }),
};
