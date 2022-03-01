import styled from 'styled-components';

export const Textarea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  height: 15rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0 2rem 0;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border: ${({ theme }) => `1px solid ${theme.colors.decors.grey}`};
`;
