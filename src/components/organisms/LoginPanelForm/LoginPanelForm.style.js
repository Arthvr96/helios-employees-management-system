import styled from 'styled-components';
import { InputForm } from 'components/atoms/InputForm/InputForm';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  label {
    margin-top: 1.5rem;
  }
`;

export const StyledInputForm = styled(InputForm)`
  font-size: 1.6rem;
  padding: 0.3rem;
`;

export const ErrorMsg = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.error};
  margin: 0.3rem 0;
  text-align: center;
`;
