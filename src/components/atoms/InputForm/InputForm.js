import styled from 'styled-components';

export const InputForm = styled.input`
  margin-left: 1.5rem;
  border-radius: 5px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border: ${({ isError, theme }) =>
    isError ? `1px solid ${theme.colors.error}` : `1px solid ${theme.colors.decors.darkGrey}`};
`;
