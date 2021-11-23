import styled from 'styled-components';

export const DaysListWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;

  ul {
    display: flex;
    list-style: none;
  }

  li {
    width: 19rem;
  }

  li:first-child,
  li:first-child button {
    border-top-left-radius: 15px;
  }
  li:last-child,
  li:last-child button {
    border-top-right-radius: 15px;
  }
`;

export const ButtonDay = styled.button`
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.darkGrey : theme.colors.white};
  border: none;
  width: 100%;
  padding: 1.1rem 0;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.textPrimary : theme.colors.textSecondary};
  cursor: pointer;
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
  text-transform: capitalize;

  &:hover {
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.darkGrey : theme.colors.lightGrey};
  }
`;
