import styled from 'styled-components';

export const InputForm = styled.input`
  padding: 0.5rem 1rem;
  margin: 0.5rem 0 2rem 0;
  border-radius: 5px;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border: ${({ isError, theme }) =>
    isError ? `1px solid ${theme.colors.error}` : `1px solid ${theme.colors.decors.grey}`};
`;
