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

export const ErrorMsg = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.error};
  margin-top: 0.5rem;
  text-align: center;

  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;