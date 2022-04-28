import styled from 'styled-components';

export const Nav = styled.ul`
  display: flex;
  list-style: none;
  margin-bottom: 3rem;

  li {
    margin-right: 1rem;
  }

  li:last-child {
    margin-right: 0;
  }
`;

export const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.text.white : theme.colors.text.darkGrey};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.bg.darkGrey : theme.colors.bg.secondary};
  cursor: pointer;
  transition: background-color 0.2s ease-in, color 0.2s ease-in;

  &:hover {
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.bg.darkGrey : theme.colors.bg.grey};
  }
`;
