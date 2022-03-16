import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ErrorMsg } from 'components/atoms/ErrorMsg/ErrorMsg';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import PropTypes from 'prop-types';
import PopupInfo from 'components/molecules/PopupInfo/PopupInfo';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import {
  SignInButton,
  StyledForm,
  WrapperLoader,
  Wrapper,
  ResetPasswordButton,
  SignInWrapper,
} from './LoginPanelForm.style';

const SignInForm = ({ handleChangePage }) => {
  const { handleLogIn } = useGlobalState();
  const [errorLogIn, setError] = useState(null);
  const [inProgress, setInProgress] = useState(false);

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
          <StyledForm onSubmit={handleSubmit} onClick={handleClearError}>
            {errorLogIn && <ErrorMsg>{errorLogIn}</ErrorMsg>}
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
            <label htmlFor="password">
              <Wrapper>
                Haslo
                {errors.password && touched.password ? (
                  <ErrorMsg> {errors.password}</ErrorMsg>
                ) : null}
              </Wrapper>
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
              <WrapperLoader>
                <LoaderRing colorVariant2 />
              </WrapperLoader>
            ) : (
              <>
                <SignInButton type="submit">Zaloguj</SignInButton>
                <ResetPasswordButton type="button" onClick={handleChangePage}>
                  odzyskaj haslo
                </ResetPasswordButton>
              </>
            )}
          </StyledForm>
        );
      }}
    </Formik>
  );
};

SignInForm.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
};

const ResetPasswordForm = ({ handleChangePage }) => {
  const [inProgress, setInProgress] = useState(false);
  const { handleResetPassword } = useGlobalState();
  const [errorResetPassword, setError] = useState(null);
  const [popup, setPopup] = useState(false);

  const handleConfirm = () => {
    setPopup(false);
    handleChangePage();
  };

  const handleClearError = () => {
    if (errorResetPassword) {
      setError(null);
    }
  };

  const onSubmit = ({ email, password }, { resetForm, setSubmitting }) => {
    setInProgress(true);
    handleResetPassword(email)
      .then((respond) => {
        setInProgress(false);
        setPopup(true);
        setError(null);
      })
      .catch((error) => {
        setInProgress(false);
        if (error.code === 'auth/user-not-found') {
          setError('Nie znaleziono użytkownika');
        } else {
          window.alert(error.code);
        }
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Nie poprawny email').required('Podanie emaila jest wymagane'),
  });

  return (
    <>
      <PopupInfo
        handleConfirm={handleConfirm}
        isVisible={popup}
        subtitle="Na twojego emaila w ciągu 5 min zostanie wysłany link do zmiany hasła.  Sprawdz spam jesli nie będzie go w głównej skrzynce."
        title="Hasło zresetowano"
      />
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
          return (
            <StyledForm onSubmit={handleSubmit} onClick={handleClearError}>
              {errorResetPassword && <ErrorMsg>{errorResetPassword}</ErrorMsg>}
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
              {inProgress ? (
                <WrapperLoader>
                  <LoaderRing colorVariant2 />
                </WrapperLoader>
              ) : (
                <>
                  <SignInButton type="submit">Zresetuj hasło</SignInButton>
                  <ResetPasswordButton type="button" onClick={handleChangePage}>
                    {`<-`} Zaloguj się
                  </ResetPasswordButton>
                </>
              )}
            </StyledForm>
          );
        }}
      </Formik>
    </>
  );
};

ResetPasswordForm.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
};

const LoginPanelForm = ({ isResetPassword, handleChangePage }) => {
  return (
    <SignInWrapper>
      {!isResetPassword && <SignInForm handleChangePage={handleChangePage} />}
      {isResetPassword && <ResetPasswordForm handleChangePage={handleChangePage} />}
    </SignInWrapper>
  );
};

export default LoginPanelForm;

LoginPanelForm.propTypes = {
  isResetPassword: PropTypes.bool.isRequired,
  handleChangePage: PropTypes.func.isRequired,
};
