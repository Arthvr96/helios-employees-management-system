import styled from 'styled-components';
import { Form } from 'components/atoms/Form/Form';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';

export const StyledForm = styled(Form)`
  min-width: 30rem;
  padding: 0 2rem;
  label {
    font-size: ${({ theme }) => theme.fontSize.s};
    text-transform: uppercase;

    input {
      width: 100%;
    }
  }
`;

export const InputHeader = styled.div`
  display: flex;

  div {
    margin-left: 2rem;
  }
`;

export const SignInButton = styled(SubmitButton)`
  margin-top: 0;
  padding: 1rem 0;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.text.white};
  background-color: ${({ theme }) => theme.colors.bg.darkGrey};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.primary};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.bg.grey};
  }
`;

export const WrapperLoader = styled.div`
  display: flex;
  justify-content: center;
`;
