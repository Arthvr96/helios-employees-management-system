import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-top: 3rem;
`;

const NewUserForm = () => {
  return (
    <Wrapper>
      <CardTitle>Dodaj uzytkownika</CardTitle>
    </Wrapper>
  );
};

export default NewUserForm;
