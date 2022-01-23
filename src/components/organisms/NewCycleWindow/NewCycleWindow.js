import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import PopupComfirm from 'components/molecules/PopupComfirm/PopupComfirm';
import { AdminStateContext } from 'providers/AdminStateProvider/AdminStateProvider';
import { StyledForm, ErrorMessages } from './NewCycleWindow.style';

const initialValues = {
  date1: '',
  date2: '',
};

const NewCycleForm = ({ toggleVisible }) => {
  // TODO: add calendar picker
  const onSubmit = (values, method) => {
    toggleVisible();
    method.resetForm();
  };

  const handleValidation = Yup.object().shape({
    date1: Yup.date().required('Podaj date początkową'),
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
          return numberOfDays === 7;
        }
        return null;
      }),
  });

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={handleValidation}>
      {({ values, touched, errors, isSubmitting, handleChange, handleSubmit, handleBlur }) => (
        <StyledForm onSubmit={handleSubmit}>
          <label htmlFor="date1">
            Początek / koniec grafiku :
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
  toggleVisible: PropTypes.func,
};

const TITLE = 'Rozpocznij nowy okres grafiku !';
const SUBTITLE = 'Wybierz nowy okres dla grafiku i odblokuj wysyłanie dyspozycji';
const TITLEPOPUP = 'Czy napewno chcesz zacząć nowy okres dla grafiku?';
const SUBTITLEPOPUP = 'Wybrany okres to : dd-mm-rrrr - dd-mm-rrrr';

const NewCycleWindow = () => {
  const { changeCycle } = useContext(AdminStateContext);
  const [isVisible, setVisible] = useState(false);

  const handleComfirm = () => {
    toggleVisible();
    changeCycle('active');
  };

  const toggleVisible = () => {
    setVisible(!isVisible);
  };
  return (
    <>
      <PopupComfirm
        title={TITLEPOPUP}
        subtitle={SUBTITLEPOPUP}
        isVisible={isVisible}
        handleComfirm={handleComfirm}
        handleCancel={toggleVisible}
      />
      <CardTemplate>
        <CardTitle>{TITLE}</CardTitle>
        <CardSubtitle>{SUBTITLE}</CardSubtitle>
        <NewCycleForm toggleVisible={toggleVisible} />
      </CardTemplate>
    </>
  );
};

export default NewCycleWindow;
