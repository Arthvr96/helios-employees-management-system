import styled from 'styled-components';

export const Nav = styled.ul`
  display: flex;
  list-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};

  li {
    border-right: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};
  }

  li:last-child {
    border: 0;
  }

  li:first-child button {
    border-top-left-radius: 10px;
  }
  li:last-child button {
    border-top-right-radius: 10px;
  }
`;

export const DayButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.text.white : theme.colors.text.black};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.bg.darkGrey : theme.colors.bg.secondary};
  border: 0;
  padding: 1rem 1rem;
  min-width: 13.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in, color 0.2s ease-in;

  &:hover {
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.bg.darkGrey : theme.colors.bg.grey};
  }
`;
