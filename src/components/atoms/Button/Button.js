import styled from 'styled-components';

export const Button = styled.button`
  width: ${({ width }) => width || 'fit-content'};
  padding: 0.7rem 3rem;
  margin: ${({ margin }) => margin};
  border: 1px solid ${({ theme }) => theme.colors.decors.black};
  border-radius: 5px;
  background-color: ${({ theme, isCancel }) =>
    isCancel ? theme.colors.bg.secondary : theme.colors.bg.primary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme, isCancel }) =>
    isCancel ? theme.fontWeight.regular : theme.fontWeight.bold};
  color: ${({ theme, isCancel }) => (isCancel ? theme.colors.text.black : theme.colors.text.white)};
  cursor: pointer;
  transition: background-color 0.3s ease-in;

  &:hover {
    background-color: ${({ isCancel }) =>
      isCancel ? 'rgba(200, 3, 3, 1)' : 'rgba(0, 164, 16, 1)'};
  }

  &:last-child {
    margin-right: 0;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.bg.grey};
    border-color: ${({ theme }) => theme.colors.decors.grey};
    color: ${({ theme }) => theme.colors.text.grey};
    cursor: not-allowed;

    &:hover {
      border-color: ${({ theme }) => theme.colors.decors.grey};
  }
`;
