import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;

  li {
    display: flex;
    justify-content: center;
    margin-bottom: 8rem;
  }

  li:last-child {
    margin-bottom: 0;
  }
`;

export const activeClassName = 'active-link';
export const StyledLink = styled(NavLink).attrs({ activeClassName })`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.white};
  text-transform: uppercase;
  transition: color 0.2s ease-out, padding 0.3s ease-out;
  text-align: center;

  &.${activeClassName} {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;
