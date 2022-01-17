import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import { Form, StyledInputForm, ErrorMsg } from './LoginPanelForm.style';

const LoginPanelForm = () => {
  const onSubmit = async (values) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
      alert(JSON.stringify(values, null, 2));
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
          <Form onSubmit={handleSubmit}>
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
              {errors.password && touched.password ? <ErrorMsg>{errors.password}</ErrorMsg> : null}
            </label>
            <SubmitButton type="submit" disabled={isSubmitting}>
              Zaloguj
            </SubmitButton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginPanelForm;
