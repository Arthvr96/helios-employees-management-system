import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavigationWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
`;

export const ListLinks = styled.ul`
  display: flex;
  list-style: none;
`;

export const LinkItem = styled.li`
  margin-left: 2.5rem;
  padding-right: 2.5rem;
  border-right: 1px solid ${({ theme }) => theme.colors.white};

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    padding-right: 0;
    border-right: none;
  }
`;

const activeClassName = 'active-link';
export const StyledLink = styled(NavLink).attrs({ activeClassName })`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: color 0.3s ease-in;

  &.${activeClassName} {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;
