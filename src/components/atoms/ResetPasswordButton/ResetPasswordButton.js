import styled from 'styled-components';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';

export const ResetPasswordButton = styled(SubmitButton)`
  margin-top: 1rem;
  padding: 1rem 0;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.text.darkGrey};
  background-color: ${({ theme }) => theme.colors.bg.white};
  border-color: ${({ theme }) => theme.colors.decors.darkGrey};
  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.primary};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.bg.grey};
  }
`;
