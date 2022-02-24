import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { ErrorMsg } from 'components/atoms/ErrorMsg/ErrorMsg';
import { InputForm } from 'components/atoms/InputForm/InputForm';
import PopupInfo from 'components/molecules/PopupInfo/PopupInfo';
import ToggleButton from 'components/molecules/ToggleButton/ToggleButton';
import WorkplacesSwitchersList from 'components/molecules/WorkplacesSwitchersList/WorkplacesSwitchersList';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import {
  StyledForm,
  WrapperLabel,
  Wrapper,
  StyledSubmitButton,
  WrapperInputs,
  WrapperAdmin,
  CircleWrapper,
  StyledWrapperLabel,
} from './NewUserForm.style';

const NewUserForm = () => {
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [adminRole, setAdminRole] = useState(false);
  const [workplaces, setWorkplaces] = useState({});
  const { createUser } = HeliosAppSdk.auth;
  const { dispoSendInfo } = useGlobalState();
  const { appState } = useGlobalState();

  const onSubmit = (values, actions) => {
    setProcessing(true);
    createUser(values, workplaces, adminRole, dispoSendInfo, appState)
      .then((respond) => {
        setProcessing(false);
        if (respond.status) {
          const obj = {
            ...values,
            id: respond.uid,
            role: adminRole ? 'admin' : 'user',
            workplaces: { ...workplaces },
          };
          if (localStorage.usersList) {
            const usersList = JSON.parse(localStorage.usersList);
            usersList.push(obj);
            localStorage.setItem('usersList', JSON.stringify(usersList));
          }
          setPopup(true);
          actions.resetForm();
        } else if (!respond.status) {
          switch (respond.error) {
            case 'auth/invalid-email':
              setError('Nie poprawny email');
              break;
            case 'firestore/alias-already-in-use':
              setError('Alias w użyciu');
              break;
            case 'auth/email-already-in-use':
              setError('Email w użyciu');
              break;
            default:
              setError(respond.error);
          }
        }
      })
      .catch((errorCode) => window.alert(errorCode.code));
  };

  const handleResetError = () => {
    if (error) {
      setError('');
    }
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
    alias: adminRole ? Yup.string() : Yup.string().required('Alias jest wymagany'),
  });

  const getValues = (values) => {
    setWorkplaces({ ...values });
  };

  return (
    <CardTemplate>
      <PopupInfo
        isVisible={popup}
        handleConfirm={() => setPopup(false)}
        title="Utworzono użytkownika"
        subtitle="Haslo wygenerowane automatycznie, użytkownik aby zalogować sie na konto będzie musiał zresetować hasło"
      />
      <Wrapper>
        <CardTitle>{adminRole ? 'Dodaj administratora' : 'Dodaj uzytkownika'}</CardTitle>
        <StyledWrapperLabel>{error ? <ErrorMsg>{error}</ErrorMsg> : null}</StyledWrapperLabel>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
            return (
              <StyledForm onSubmit={handleSubmit} onClick={handleResetError}>
                <WrapperAdmin>
                  Administrator :
                  <ToggleButton
                    onClick={() => setAdminRole(!adminRole)}
                    type="button"
                    state={adminRole}
                  />
                </WrapperAdmin>

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
                      onFocus={handleResetError}
                    />
                    <InputForm
                      id="lastName"
                      type="text"
                      placeholder="Podaj Nazwisko"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isError={errors.lastName && touched.lastName}
                      onFocus={handleResetError}
                    />
                  </WrapperInputs>
                </label>
                {!adminRole ? (
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
                        handleResetError();
                        if (e.target.value === '' || e.target.value === e.target.placeholder) {
                          e.target.value = e.target.placeholder;
                          values.alias = e.target.placeholder;
                        }
                      }}
                    />
                  </label>
                ) : null}

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
                    onFocus={handleResetError}
                  />
                </label>

                {!adminRole ? (
                  <>
                    <WrapperLabel>Uprawnienia :</WrapperLabel>
                    <WorkplacesSwitchersList getValues={getValues} />
                  </>
                ) : null}
                {processing ? (
                  <CircleWrapper>
                    <LoaderRing colorVariant2 />
                  </CircleWrapper>
                ) : (
                  <StyledSubmitButton customMargin="1rem" type="submit">
                    Stwórz konto
                  </StyledSubmitButton>
                )}
              </StyledForm>
            );
          }}
        </Formik>
      </Wrapper>
    </CardTemplate>
  );
};

export default NewUserForm;
// .then((respondObj) => {
//   setProcessing(false);
//   console.log(respondObj);
// if (respondObj.status) {
//   const obj = {
//     ...values,
//     id: respondObj.uid,
//     role: adminRole ? 'admin' : 'user',
//     workplaces: { ...workplaces },
//   };
//   if (localStorage.usersList) {
//     const usersList = JSON.parse(localStorage.usersList);
//     usersList.push(obj);
//     localStorage.setItem('usersList', JSON.stringify(usersList));
//   }
//   setPopup(true);
//   actions.resetForm();
// } else if (!respondObj.status) {
//   switch (respondObj.error) {
//     case 'auth/invalid-email':
//       setError('Nie poprawny email');
//       break;
//     case 'firestore/alias-already-in-use':
//       setError('Alias w użyciu');
//       break;
//     case 'auth/email-already-in-use':
//       setError('Email w użyciu');
//       break;
//     default:
//       setError(respondObj.error);
//   }
// }
// });
