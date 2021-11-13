import styled from 'styled-components';
import logo from 'assets/logo.svg';

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 23rem;
  height: 6.5rem;
  border-right: 1px solid ${({ theme }) => theme.colors.white};
`;

export const Title = styled.h1`
  display: block;
  width: 13rem;
  height: 2.5rem;
  background: url(${logo}) no-repeat;
  text-indent: -999rem;
`;
