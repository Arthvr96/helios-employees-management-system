import styled from 'styled-components';

export const CardNav = styled.ul`
  position: relative;
  display: flex;
  list-style: none;

  li {
    padding: 0 1rem;
    border-right: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};
  }

  li:last-child {
    border: none;
  }
`;

export const CardNavButton = styled.button`
  padding: 1rem 1.5rem;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.bg.darkGrey : 'transparent'};
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme, isSelected }) =>
    isSelected ? theme.fontWeight.bold : theme.fontWeight.light};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.text.white : theme.colors.text.black};
  transition: background-color 0.3s ease-in, color 0.3s ease-in;

  &:hover {
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.bg.darkGrey : theme.colors.bg.grey};
    color: ${({ theme }) => theme.colors.text.routeSelected};
  }
`;
