import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import LabelError from 'components/molecules/LabelError/LabelError';
import { ErrorMsg } from 'components/atoms/ErrorMsg/ErrorMsg';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import { StyledFormLogIn } from 'components/atoms/StyledFormLogIn/StyledFormLogIn';
import { SignInButton } from 'components/atoms/SignInButton/SignInButton';
import { ResetPasswordButton } from 'components/atoms/ResetPasswordButton/ResetPasswordButton';

const SignInForm = ({ handleChangePage }) => {
  const [inProgress, setInProgress] = useState(false);
  const { handleLogIn } = useGlobalState();
  const [errorLogIn, setError] = useState(null);

  const handleClearError = () => {
    if (errorLogIn) {
      setError(null);
    }
  };

  const onSubmit = ({ email, password }, { resetForm }) => {
    setInProgress(true);
    handleLogIn(email, password)
      .then(() => {
        setInProgress(false);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          setError('Zły login lub/i hasło');
        } else {
          setError('Błąd logowania');
          window.alert(`Błąd krytyczny logowania : ${error.code}`);
        }
        setInProgress(false);
        resetForm();
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Nie poprawny email').required('Podanie emaila jest wymagane'),
    password: Yup.string().required('Podanie hasla jest wymagane'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
        return (
          <StyledFormLogIn onSubmit={handleSubmit} onClick={handleClearError}>
            {errorLogIn && <ErrorMsg>{errorLogIn}</ErrorMsg>}
            <label htmlFor="email">
              <LabelError labelName="Email" touched={touched.email} errors={errors.email} />
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
            <label htmlFor="password">
              <LabelError labelName="Haslo" touched={touched.password} errors={errors.password} />
              <InputForm
                id="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.password && touched.password}
                onFocus={() => handleClearError()}
              />
            </label>
            {inProgress ? (
              <div style={{ margin: '0 auto' }}>
                <LoaderRing colorVariant2 />
              </div>
            ) : (
              <>
                <SignInButton type="submit">Zaloguj</SignInButton>
                <ResetPasswordButton type="button" onClick={handleChangePage}>
                  odzyskaj haslo
                </ResetPasswordButton>
              </>
            )}
          </StyledFormLogIn>
        );
      }}
    </Formik>
  );
};

SignInForm.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
};

export default SignInForm;
