import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WrapperButtons = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;
export const WrapperTabs = styled.div`
  position: relative;
  display: flex;
  width: 2300px;
  overflow-x: scroll;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ theme, disabled }) => (disabled ? theme.colors.grey : theme.colors.button)};
  border: 1px solid ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-transform: uppercase;
  border-radius: 15px;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.black : theme.colors.textPrimary)};
  transition: background-color 0.3s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? 'no-drop' : 'pointer')};
  margin-left: 2rem;

  &:hover {
    background: ${({ theme, disabled }) => (disabled ? theme.colors.grey : theme.colors.button)};
  }
`;
