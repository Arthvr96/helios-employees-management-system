import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { ErrorMsg } from 'components/atoms/ErrorMsg/ErrorMsg';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import PropTypes from 'prop-types';
import PopupInfo from 'components/molecules/PopupInfo/PopupInfo';
import {
  SignInButton,
  StyledForm,
  WrapperLoader,
  Wrapper,
  ResetPasswordButton,
  SignInWrapper,
} from './LoginPanelForm.style';

const LoginPanelFormPage1 = ({ handleChangePage, handleBasicForm }) => {
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
                <ResetPasswordButton type="button" onClick={handleBasicForm}>
                  Zgłoś emaila
                </ResetPasswordButton>
              </>
            )}
          </StyledForm>
        );
      }}
    </Formik>
  );
};

LoginPanelFormPage1.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
  handleBasicForm: PropTypes.func.isRequired,
};

const LoginPanelFormPage2 = ({ handleChangePage }) => {
  const { inProgress, resetPassword } = useAuth();
  const [errorSignin, setError] = useState(null);
  const [popup, setPopup] = useState(false);

  const handleConfirm = () => {
    setPopup(false);
    handleChangePage();
  };

  const handleClearError = () => {
    if (errorSignin) {
      setError(null);
    }
  };

  const onSubmit = ({ email, password }, { resetForm, setSubmitting }) => {
    resetPassword(email)
      .then((respond) => {
        setPopup(true);
        setError(null);
      })
      .catch((error) => {
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

LoginPanelFormPage2.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
};

const LoginPanelForm = ({ isResetPassword, handleChangePage, handleBasicForm }) => {
  return (
    <SignInWrapper>
      {!isResetPassword && (
        <LoginPanelFormPage1
          handleChangePage={handleChangePage}
          handleBasicForm={handleBasicForm}
        />
      )}
      {isResetPassword && <LoginPanelFormPage2 handleChangePage={handleChangePage} />}
    </SignInWrapper>
  );
};

export default LoginPanelForm;

LoginPanelForm.propTypes = {
  isResetPassword: PropTypes.bool.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleBasicForm: PropTypes.func.isRequired,
};
