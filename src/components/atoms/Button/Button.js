import styled from 'styled-components';

export const Button = styled.button`
  width: 100px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-radius: 15px;
  background-color: ${({ theme }) => theme.lightGrey};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme, isCancel }) =>
    isCancel ? theme.fontWeight.regular : theme.fontWeight.bold};
  padding: 0.3rem;
  margin-right: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in;

  &:hover {
    background-color: ${({ isCancel }) =>
      isCancel ? 'rgba(200, 3, 3, 0.6)' : 'rgba(0, 164, 16, 0.6)'};
  }

  &:last-child {
    margin-right: 0;
  }
`;
