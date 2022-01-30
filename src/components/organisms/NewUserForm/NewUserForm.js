import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { ErrorMsg } from 'components/atoms/ErrorMsg/ErrorMsg';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import { Form } from 'components/atoms/Form/Form';
import WorkplacesSwitchersList from 'components/molecules/WorkplacesSwitchersList/WorkplacesSwitchersList';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import PopupInfo from 'components/molecules/PopupInfo/PopupInfo';
import { WrapperLabel, Wrapper, StyledSubmitButton, WrapperInputs } from './NewUserForm.style';

const NewUserForm = () => {
  const [rolesValues, setRolesValues] = useState({});
  const [popup, setPopup] = useState(false);
  const { createUser } = useAuth();

  const onSubmit = async (values, actions) => {
    await createUser(values, rolesValues)
      .then(() => {
        setPopup(true);
      })
      .catch((error) => {
        if (error === 'internalError/alias-already-in-use') {
          window.alert(`Ten alias (${values.alias}) jest już w użyciu`);
        } else {
          window.alert(error.code);
        }
      });
    actions.resetForm();
  };

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    alias: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Nie poprawny email').required('Podanie emaila jest wymagane'),
    firstName: Yup.string().required('Imie i nazwisko jest wymagane'),
    lastName: Yup.string().required('Imie i nazwisko jest wymagane'),
    alias: Yup.string().required('Alias jest wymagany'),
  });

  const getValues = (values) => {
    setRolesValues({ ...values });
  };

  return (
    <>
      <PopupInfo
        isVisible={popup}
        handleConfirm={() => setPopup(false)}
        title="Utworzono użytkownika"
        subtitle="Haslo wygenerowane automatycznie, użytkownik aby zalogować sie na konto będzie musiał zresetować hasło"
      />
      <Wrapper>
        <CardTitle>Dodaj uzytkownika</CardTitle>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <label htmlFor="name">
                  <WrapperLabel>
                    Imie i nazwisko :
                    {(errors.firstName && touched.firstName) ||
                    (errors.lastName && touched.lastName) ? (
                      <ErrorMsg>{errors.firstName || errors.lastName}</ErrorMsg>
                    ) : null}
                  </WrapperLabel>
                  <WrapperInputs>
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
                  </WrapperInputs>
                </label>
                <label htmlFor="alias">
                  <WrapperLabel>
                    Rodo alias :
                    {errors.alias && touched.alias && errors.alias ? (
                      <ErrorMsg>{errors.alias}</ErrorMsg>
                    ) : null}
                  </WrapperLabel>
                  <InputForm
                    id="alias"
                    placeholder={
                      values.firstName || values.lastName
                        ? `${values.lastName.slice(0, 3)} ${values.firstName.slice(0, 3)}`
                        : 'Podaj alias'
                    }
                    type="text"
                    value={values.alias}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={errors.alias && touched.alias}
                    onFocus={(e) => {
                      if (e.target.value === '' || e.target.value === e.target.placeholder) {
                        e.target.value = e.target.placeholder;
                        values.alias = e.target.placeholder;
                      }
                    }}
                  />
                </label>
                <label htmlFor="email">
                  <WrapperLabel>
                    Email :
                    {errors.email && touched.email && errors.email ? (
                      <ErrorMsg>{errors.email}</ErrorMsg>
                    ) : null}
                  </WrapperLabel>
                  <InputForm
                    id="email"
                    placeholder="Podaj maila"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={errors.email && touched.email}
                  />
                </label>
                <WrapperLabel>Uprawnienia :</WrapperLabel>
                <WorkplacesSwitchersList getValues={getValues} />
                <StyledSubmitButton disabled={isSubmitting} customMargin="1rem" type="submit">
                  Stwórz konto
                </StyledSubmitButton>
              </Form>
            );
          }}
        </Formik>
      </Wrapper>
    </>
  );
};

export default NewUserForm;
