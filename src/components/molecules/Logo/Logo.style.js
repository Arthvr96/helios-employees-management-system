import styled from 'styled-components';

export const LogoWrapper = styled.button`
  width: 18rem;
  height: 6rem;
  border: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.decors.white};
  background-color: transparent;
  cursor: pointer;
`;
