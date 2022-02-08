import styled from 'styled-components';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';

export const StyledTitle = styled(CardTitle)`
  width: 25.6rem;
`;

export const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const StyledSubmitButton = styled(SubmitButton)`
  width: 45%;
  padding: 0.5rem 0rem;
  background-color: ${({ isAccept, theme }) =>
    isAccept ? theme.colors.success : theme.colors.error};
  color: ${({ theme }) => theme.colors.text.white};
  border: 1px solid
    ${({ isAccept, theme }) => (isAccept ? theme.colors.success : theme.colors.error)};

  &:hover {
    border: 1px solid
      ${({ isAccept, theme }) =>
        isAccept ? theme.colors.decors.hoverSuccess : theme.colors.decors.hoverError};
    background-color: ${({ isAccept, theme }) =>
      isAccept ? theme.colors.decors.hoverSuccess : theme.colors.decors.hoverError};
  }
  &:active {
    border: 1px solid ${({ theme }) => theme.colors.decors.black};
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text.black};
  }
`;
