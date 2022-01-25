import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { ErrorMsg } from 'components/atoms/ErrorMsg/ErrorMsg';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import { SignInButton, StyledForm, WrapperLoader, InputHeader } from './LoginPanelForm.style';

const LoginPanelForm = () => {
  const { logIn, inProgress } = useAuth();
  const [errorSignin, setError] = useState(null);

  const handleClearError = () => {
    if (errorSignin) {
      setError(null);
    }
  };

  const onSubmit = async ({ email, password }, { resetForm, setSubmitting }) => {
    logIn(email, password)
      .then(() => {
        setError(null);
      })
      .catch(() => {
        setError('Login lub/i hasło jest/są błędne');
      });
  };

  const onFocus = () => {
    handleClearError();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Nie poprawny email').required('Podanie emaila jest wymagane'),
    password: Yup.string().required('Podanie hasla jest wymagane'),
  });

  const initialValues = { email: '', password: '' };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
        return (
          <StyledForm onSubmit={handleSubmit} onClick={handleClearError}>
            {errorSignin && <ErrorMsg>{errorSignin}</ErrorMsg>}
            <label htmlFor="email">
              <InputHeader>
                Email{errors.email && touched.email ? <ErrorMsg>{errors.email}</ErrorMsg> : null}
              </InputHeader>

              <InputForm
                id="email"
                placeholder="Enter your email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.email && touched.email}
                onFocus={onFocus}
              />
            </label>
            <label htmlFor="password">
              <InputHeader>
                Haslo
                {errors.password && touched.password ? (
                  <ErrorMsg> {errors.password}</ErrorMsg>
                ) : null}
              </InputHeader>
              <InputForm
                id="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.password && touched.password}
                onFocus={onFocus}
              />
            </label>
            {inProgress ? (
              <WrapperLoader>
                <LoaderRing colorVariant2 />
              </WrapperLoader>
            ) : (
              <SignInButton type="submit">Zaloguj</SignInButton>
            )}
          </StyledForm>
        );
      }}
    </Formik>
  );
};

export default LoginPanelForm;
