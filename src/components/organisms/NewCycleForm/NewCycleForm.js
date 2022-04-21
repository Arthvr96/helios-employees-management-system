import React, { useState, useEffect } from 'react';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  ErrorMessages,
  StyledForm,
} from 'components/organisms/NewCycleWindow/NewCycleWindow.style';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import { Button } from 'components/atoms/Button/Button';
import MarathonPicker from 'components/molecules/MarathonPicker/MarathonPicker';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import PropTypes from 'prop-types';

const NewCycleForm = ({ onSubmit, marathonDays, setMarathonDays, workDays, setWorkDays }) => {
  const { appState } = useGlobalState();
  const [marathonPicker, setMarathonPicker] = useState(false);
  const [daysPicker, setDaysPicker] = useState(false);
  const [marathonCounter, setMarathonCounter] = useState(0);
  const [daysCounter, setDaysCounter] = useState(7);

  const handleValidation = Yup.object().shape({
    date1: Yup.date()
      .required('Podaj date początkową')
      .test(
        'is-bigger',
        'Początek okresu musi zacząć się minimum dzień po zakończeniu ostatniego okresu',
        (value) => {
          if (value && appState.lastDate2) {
            const date1 = new Date(value).getTime();
            const date2 = new Date(appState.lastDate2).getTime();
            return date1 > date2;
          }
          return null;
        },
      )
      .test('is-friday', 'Początek okresu musi zacząć się od Piątku', (value) => {
        if (value) {
          const date1 = new Date(new Date(value).getTime() + 1000 * 60 * 60 * 2);
          return date1.getDay() === 5;
        }
        return null;
      }),
    date2: Yup.date()
      .required('Podaj date końcową')
      .test(
        'is-bigger',
        'Koniec okresu nie moze zaczynac szybciej niz poczatek okresu!',
        (value, context) => {
          if (value && context.parent.date1) {
            const date1 = new Date(context.parent.date1).getTime();
            const date2 = new Date(value).getTime();
            return date2 > date1;
          }
          return null;
        },
      )
      .test('is-7days', 'Okres to 7 dni', (value, context) => {
        if (value && context.parent.date1) {
          const dayMiliseconds = 1000 * 60 * 60 * 24;
          const date1 = new Date(context.parent.date1).getTime();
          const date2 = new Date(value).getTime();
          const numberOfDays = (date2 - date1) / dayMiliseconds + 1;
          return numberOfDays > 6.7 && numberOfDays < 7.7;
        }
        return null;
      }),
  });

  useEffect(() => {
    const arr = Object.values(marathonDays).filter((v) => v);
    setMarathonCounter(arr.length);
  }, [marathonDays]);

  useEffect(() => {
    const arr = Object.values(workDays).filter((v) => v);
    setDaysCounter(arr.length);
  }, [workDays]);

  return (
    <Formik
      initialValues={{
        date1: appState.lastDate2,
        date2: appState.lastDate2,
      }}
      onSubmit={onSubmit}
      validationSchema={handleValidation}
    >
      {({ values, touched, errors, isSubmitting, handleChange, handleSubmit, handleBlur }) => (
        <StyledForm onSubmit={handleSubmit}>
          <label htmlFor="date1">
            Początek / koniec grafiku :
            <div>
              <InputForm
                id="date1"
                name="date1"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.date1}
                isError={errors.date1}
              />
              <InputForm
                id="date2"
                name="date2"
                type="date"
                value={values.date2}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.date2}
              />
            </div>
            <ErrorMessages>
              {(errors.date1 && touched.date1) || (errors.date2 && touched.date2)
                ? `${errors.date1 ? errors.date1 : ''} ${errors.date1 && errors.date2 ? '|' : ''} ${
                    errors.date2 ? errors.date2 : ''
                  }`
                : null}
            </ErrorMessages>
          </label>
          {!errors.date1 && !errors.date2 && values.date1 !== values.date2 ? (
            <>
              <Button
                onClick={() => setMarathonPicker(!marathonPicker)}
                isOpen={marathonPicker}
                withArrow
                padding="0.7rem 5rem 0.7rem 3rem"
                margin={marathonPicker ? '0 0 2rem 0' : '0'}
                type="button"
              >
                {`Dni maratonowe: ${marathonCounter}/7`}
              </Button>
              {marathonPicker ? (
                <MarathonPicker
                  checkboxValues={marathonDays}
                  setCheckboxValues={setMarathonDays}
                  date1={values.date1}
                  date2={values.date2}
                />
              ) : null}
              <Button
                onClick={() => setDaysPicker(!daysPicker)}
                isOpen={daysPicker}
                withArrow
                padding="0.7rem 5rem 0.7rem 3rem"
                margin={daysPicker ? '2rem 0 2rem 0' : '2rem 0 0 0'}
                type="button"
              >
                {`Dni pracy kina: ${daysCounter}/7`}
              </Button>
              {daysPicker ? (
                <MarathonPicker
                  checkboxValues={workDays}
                  setCheckboxValues={setWorkDays}
                  date1={values.date1}
                  date2={values.date2}
                />
              ) : null}
            </>
          ) : null}

          <SubmitButton type="submit" disabled={isSubmitting}>
            Zapisz
          </SubmitButton>
        </StyledForm>
      )}
    </Formik>
  );
};

NewCycleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  marathonDays: PropTypes.objectOf(PropTypes.bool).isRequired,
  setMarathonDays: PropTypes.func.isRequired,
  workDays: PropTypes.objectOf(PropTypes.bool).isRequired,
  setWorkDays: PropTypes.func.isRequired,
};

export default NewCycleForm;
