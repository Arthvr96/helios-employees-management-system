import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import PopupConfirm from 'components/molecules/PopupConfirm/PopupConfirm';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { useAdminContext } from 'providers/AuthProvider/AdminStateProvider/AdminStateProvider';
import { StyledForm, ErrorMessages } from './NewCycleWindow.style';

const NewCycleForm = ({ onSubmit }) => {
  const { appState } = useAuth();

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
      ),
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
};

const TITLE = 'Rozpocznij nowy okres grafiku !';
const SUBTITLE = 'Wybierz nowy okres dla grafiku i odblokuj wysyłanie dyspozycji';
const TITLEPOPUP = 'Czy napewno chcesz zacząć nowy okres dla grafiku?';
const SUBTITLEPOPUP = 'Wybrany okres to : ';

const NewCycleWindow = () => {
  const { appState } = useAuth();
  const { handleChangeCycleState } = useAdminContext();
  const [isVisible, setVisible] = useState(false);
  const [valuesForm, setValuesForm] = useState({ date1: '', date2: '' });

  const toggleVisible = () => {
    setVisible(!isVisible);
  };

  const handleSubmit = (values, method) => {
    toggleVisible();
    method.resetForm();
    setValuesForm({ ...values });
  };

  const handleConfirm = () => {
    toggleVisible();
    handleChangeCycleState('newCycle', valuesForm);
  };

  return (
    <>
      <PopupConfirm
        title={TITLEPOPUP}
        subtitle={`${SUBTITLEPOPUP}${valuesForm.date1} : ${valuesForm.date2}`}
        isVisible={isVisible}
        handleConfirm={handleConfirm}
        handleCancel={toggleVisible}
      />
      <CardTemplate>
        <CardTitle>{TITLE}</CardTitle>
        <CardSubtitle>{SUBTITLE}</CardSubtitle>
        <CardSubtitle>{`Ostatni wybrany okres: ${appState.lastDate1} - ${appState.lastDate2}`}</CardSubtitle>
        <NewCycleForm toggleVisible={toggleVisible} onSubmit={handleSubmit} />
      </CardTemplate>
    </>
  );
};

export default NewCycleWindow;
