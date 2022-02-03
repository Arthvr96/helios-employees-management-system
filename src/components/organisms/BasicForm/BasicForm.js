import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  ResetPasswordButton,
  SignInButton,
  StyledForm,
  Wrapper,
  WrapperLoader,
} from 'components/organisms/LoginPanelForm/LoginPanelForm.style';
import { ErrorMsg } from 'components/atoms/ErrorMsg/ErrorMsg';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import PropTypes from 'prop-types';
import { useAuth } from 'providers/AuthProvider/AuthProvider';

const BasicForm = ({ handleBasicForm, setIsVisible, handleConfirm }) => {
  const [errorSignin, setError] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const { addBasicInfo } = useAuth();

  const handleClearError = () => {
    if (errorSignin) {
      setError(null);
    }
  };

  const onSubmit = async (values, { resetForm }) => {
    setInProgress(true);
    await addBasicInfo(values)
      .then((respond) => {
        if (respond) {
          resetForm();
          setInProgress(false);
          setIsVisible(true);
          setError(null);
        }
      })
      .catch((error) => {
        setError('Email juz w użyciu');
        setInProgress(false);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Nie poprawny email').required('Podanie emaila jest wymagane'),
    firstName: Yup.string().required('Podanie imienia jest wymagane'),
    lastName: Yup.string().required('Podanie nazwiska jest wymagane'),
  });

  return (
    <Formik
      initialValues={{ email: '', firstName: '', lastName: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
        return (
          <StyledForm onSubmit={handleSubmit} onClick={handleClearError}>
            {errorSignin && <ErrorMsg>{errorSignin}</ErrorMsg>}
            <label htmlFor="email">
              <Wrapper>
                Email{errors.email && touched.email ? <ErrorMsg>{errors.email}</ErrorMsg> : null}
              </Wrapper>
              <InputForm
                id="email"
                placeholder="Podaj swój email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.email && touched.email}
                onFocus={() => handleClearError()}
              />
            </label>
            <label htmlFor="firstName">
              <Wrapper>
                Imie:
                {errors.firstName && touched.firstName ? (
                  <ErrorMsg> {errors.firstName}</ErrorMsg>
                ) : null}
              </Wrapper>
              <InputForm
                id="firstName"
                type="text"
                placeholder="Podaj imię"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.firstName && touched.firstName}
                onFocus={() => handleClearError()}
              />
            </label>
            <label htmlFor="lastName">
              <Wrapper>
                Nazwisko:
                {errors.lastName && touched.lastName ? (
                  <ErrorMsg> {errors.lastName}</ErrorMsg>
                ) : null}
              </Wrapper>
              <InputForm
                id="lastName"
                type="text"
                placeholder="Podaj nazwisko"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.lastName && touched.lastName}
                onFocus={() => handleClearError()}
              />
            </label>
            {inProgress ? (
              <WrapperLoader>
                <LoaderRing colorVariant2 />
              </WrapperLoader>
            ) : (
              <>
                <SignInButton type="submit">Wyslij dane</SignInButton>
                <ResetPasswordButton type="button" onClick={() => handleBasicForm(false)}>
                  Cofnij
                </ResetPasswordButton>
              </>
            )}
          </StyledForm>
        );
      }}
    </Formik>
  );
};

export default BasicForm;

BasicForm.propTypes = {
  handleBasicForm: PropTypes.func.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};
