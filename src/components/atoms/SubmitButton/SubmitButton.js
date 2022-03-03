import styled from 'styled-components';

export const SubmitButton = styled.button`
  width: 100%;
  margin: ${({ margin }) => margin || '1.5rem 0 0 0'};
  padding: 0.7rem 3rem;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.darkGrey};
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out,
    border-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme, isDangerous }) =>
      isDangerous ? theme.colors.error : theme.colors.bg.darkGrey};
    border: 1px solid
      ${({ theme, isDangerous }) =>
        isDangerous ? theme.colors.error : theme.colors.decors.darkGrey};
    color: ${({ theme }) => theme.colors.text.white};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.bg.grey};
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
