import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import { Form, StyledInputForm, ErrorMsg } from './LoginPanelForm.style';

const LoginPanelForm = () => {
  const { logIn } = useAuth();
  const [errorSignin, setError] = useState(null);

  const handleClearError = () => {
    if (errorSignin) {
      setError(null);
    }
  };

  const onSubmit = async ({ email, password }, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    await logIn(email, password)
      .then(() => {
        if (errorSignin) {
          setError(null);
          setSubmitting(false);
        }
      })
      .catch((error) => {
        setError('Zły login lub/i hasło');
        resetForm();
        setSubmitting(false);
      });
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
          <Form onSubmit={handleSubmit} onClick={handleClearError}>
            {errorSignin && !touched.email && !touched.password && (
              <ErrorMsg>{errorSignin}</ErrorMsg>
            )}
            <label htmlFor="email" style={{ display: 'block' }}>
              Email :
              <StyledInputForm
                id="email"
                placeholder="Enter your email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.email && touched.email}
              />
              {errors.email && touched.email ? <ErrorMsg>{errors.email}</ErrorMsg> : null}
            </label>
            <label htmlFor="password" style={{ display: 'block' }}>
              Haslo :
              <StyledInputForm
                id="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.password && touched.password}
              />
              {errors.password && touched.password ? <ErrorMsg> {errors.password}</ErrorMsg> : null}
            </label>
            <SubmitButton disabled={isSubmitting} customMargin="1rem" type="submit">
              Zaloguj
            </SubmitButton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginPanelForm;
