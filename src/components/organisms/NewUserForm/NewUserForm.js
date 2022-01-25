import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import styled from 'styled-components';
import { ErrorMsg } from 'components/atoms/ErrorMsg/ErrorMsg';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  label {
    display: flex;
    flex-direction: column;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.black};
    div input.first {
      margin-right: 1rem;
    }
  }
`;

const InputForm = styled.input`
  padding: 0.5rem;
  margin: 1rem 0 2rem 0;
  border-radius: 2px;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border: ${({ isError, theme }) =>
    isError ? `1px solid ${theme.colors.error}` : `1px solid ${theme.colors.decors.grey}`};
`;

const StyledSubmitButton = styled(SubmitButton)`
  width: 100%;
`;

const NewUserForm = () => {
  const onSubmit = (values, actions) => {
    setTimeout(() => {
      actions.resetForm();
      console.log(values);
    }, 500);
  };

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    alias: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Nie poprawny email').required('Podanie emaila jest wymagane'),
  });

  return (
    <Wrapper>
      <CardTitle>Dodaj uzytkownika</CardTitle>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <label htmlFor="name">
                Imie i nazwisko :
                <div>
                  <InputForm
                    id="firstName"
                    type="text"
                    placeholder="Podaj Imie"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={errors.firstName && touched.firstName}
                    className="first"
                  />
                  <InputForm
                    id="lastName"
                    type="text"
                    placeholder="Podaj Nazwisko"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={errors.lastName && touched.lastName}
                  />
                </div>
                {errors.firstName && touched.firstName ? (
                  <ErrorMsg>{errors.firstName}</ErrorMsg>
                ) : null}
              </label>
              <label htmlFor="alias">
                Rodo alias :
                <InputForm
                  id="alias"
                  placeholder={`${values.firstName.slice(0, 3)}${values.lastName.slice(0, 3)}`}
                  type="text"
                  value={values.alias}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={errors.alias && touched.alias}
                />
                {errors.alias && touched.alias ? <ErrorMsg>{errors.alias}</ErrorMsg> : null}
              </label>
              <label htmlFor="email">
                Email :
                <InputForm
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
              <StyledSubmitButton disabled={isSubmitting} customMargin="1rem" type="submit">
                Stwórz konto
              </StyledSubmitButton>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default NewUserForm;
