import styled from 'styled-components';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';

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
