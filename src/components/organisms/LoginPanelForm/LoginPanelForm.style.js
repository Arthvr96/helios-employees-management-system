import styled from 'styled-components';
import { InputForm } from 'components/atoms/InputForm/InputForm';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    margin-top: 1rem;
  }
`;

export const StyledInputForm = styled(InputForm)`
  width: 20rem;
  font-size: 1.6rem;
  padding: 0.3rem;
`;
