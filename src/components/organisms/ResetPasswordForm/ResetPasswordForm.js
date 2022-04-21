import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import PopupInfo from 'components/molecules/PopupInfo/PopupInfo';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import LabelError from 'components/molecules/LabelError/LabelError';
import { ErrorMsg } from 'components/atoms/ErrorMsg/ErrorMsg';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import { StyledFormLogIn } from 'components/atoms/StyledFormLogIn/StyledFormLogIn';
import { SignInButton } from 'components/atoms/SignInButton/SignInButton';
import { ResetPasswordButton } from 'components/atoms/ResetPasswordButton/ResetPasswordButton';

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
            <StyledFormLogIn onSubmit={handleSubmit} onClick={handleClearError}>
              {errorResetPassword && <ErrorMsg>{errorResetPassword}</ErrorMsg>}
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
              {inProgress ? (
                <div style={{ margin: '0 auto' }}>
                  <LoaderRing colorVariant2 />
                </div>
              ) : (
                <>
                  <SignInButton type="submit">Zresetuj hasło</SignInButton>
                  <ResetPasswordButton type="button" onClick={handleChangePage}>
                    {`<-`} Zaloguj się
                  </ResetPasswordButton>
                </>
              )}
            </StyledFormLogIn>
          );
        }}
      </Formik>
    </>
  );
};

ResetPasswordForm.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
