import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 3rem;
  height: 3rem;
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.black};
  cursor: pointer;
  transition: color 0.2s ease-in, background-color 0.2s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.primary};
    color: ${({ theme }) => theme.colors.text.white};
  }
`;
