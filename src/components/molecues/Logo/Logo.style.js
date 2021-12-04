import styled from 'styled-components';
import logo from 'assets/logo.svg';

export const LogoWrapper = styled.button`
  width: 18rem;
  height: 6rem;
  border: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.decors.white};
  background-color: transparent;
  cursor: pointer;
`;

export const LogoIcone = styled.h1`
  display: block;
  width: 13rem;
  height: 2.5rem;
  background: url(${logo}) no-repeat;
  text-indent: -999rem;
`;
