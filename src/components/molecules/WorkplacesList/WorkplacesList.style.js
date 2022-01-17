import styled from 'styled-components';

export const WorkplacesListWrapper = styled.ul`
  min-width: 10rem;
  margin-left: 3rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  li:last-child {
    margin-bottom: none;
  }
`;

export const ButtonWorkplace = styled.button`
  position: relative;
  margin-bottom: 2rem;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme, isSelected }) =>
    isSelected ? theme.fontWeight.bold : theme.fontWeight.nomral};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  transition: text-shadow 0.2s ease-in-out;

  &:hover {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  &:before {
    position: absolute;
    left: -5px;
    bottom: -2px;
    content: '';
    display: block;
    width: ${({ isSelected }) => (isSelected ? 'calc(50% + 6px)' : '0%')};
    height: 1px;
    background-color: ${({ theme }) => theme.colors.black};
    transform-origin: right center;
    transition: width 0.2s ease-in;
  }

  &:after {
    position: absolute;
    right: -5px;
    bottom: -2px;
    content: '';
    display: block;
    width: ${({ isSelected }) => (isSelected ? 'calc(50% + 5px)' : '0%')};
    height: 1px;
    background-color: ${({ theme }) => theme.colors.black};
    transition: width 0.2s ease-in;
  }
`;
