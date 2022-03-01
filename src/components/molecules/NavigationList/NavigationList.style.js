import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import media from 'utliltes/media';

export const NavigationListWrapper = styled.ul`
  display: flex;
  list-style: none;
`;

export const NavigationItem = styled.li`
  &:last-child a {
    border: 0;
  }
`;

export const activeClassName = 'active-link';
export const StyledLink = styled(NavLink).attrs({ activeClassName })`
  display: block;
  padding: 0.3rem 1rem;
  border-right: 1px solid ${({ theme }) => theme.colors.decors.white};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.white};
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.2s ease-out, padding 0.3s ease-out;

  &.${activeClassName} {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.text.routeSelected};
  }

  ${media.desktop`
   padding: 0.3rem 2.5rem;
  `}

  ${media.desktopXL`
   padding: 0.3rem 4.5rem;
  `}
`;
