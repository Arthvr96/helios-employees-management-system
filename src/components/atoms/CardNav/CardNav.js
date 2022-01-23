import styled from 'styled-components';

export const CardNav = styled.ul`
  position: relative;
  display: flex;
  list-style: none;

  li {
    padding: 0 1rem;
  }

  li:first-child {
    border-right: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};
  }
`;
