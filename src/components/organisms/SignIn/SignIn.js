import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: white;
  border-radius: 15px;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: black;
  margin-bottom: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 1.5rem;
    margin-left: 0.5rem;
  }
`;

const SignIn = ({ setAuthAdmin }) => {
  const [values, setValues] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {})
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <Wrapper>
      <SignInWrapper>
        <Title>Zaloguj sie : </Title>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Login :
            <input
              type="text"
              name="email"
              id="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
            />
          </label>
          <label htmlFor="email">
            password :
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
            />
          </label>
          <button type="submit">Zaloguj</button>
        </Form>
      </SignInWrapper>
    </Wrapper>
  );
};

export default SignIn;

SignIn.propTypes = {
  setAuthAdmin: PropTypes.func,
};
