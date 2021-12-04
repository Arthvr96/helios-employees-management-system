import styled from 'styled-components';

export const SubmitButton = styled.button`
  width: fit-content;
  margin-top: 4rem;
  padding: 0.5rem 4rem;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};
  border-radius: 15px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.darkGrey};
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.darkGrey};
    color: ${({ theme }) => theme.colors.text.white};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.bg.grey};
  }
`;
