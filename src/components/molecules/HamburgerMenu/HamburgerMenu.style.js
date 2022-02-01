import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2000;
  background-color: ${({ theme }) => theme.colors.bg.primary};
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100vw)')};
  transition: transform 0.3s ease-in;
`;

export const SignOutButton = styled.button`
  position: absolute;
  bottom: 25px;
  width: 15rem;
  height: 3.8rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.bg.primary};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.white};
  border: 0;
  box-shadow: inset 0 0 12px 2px rgba(0, 0, 0, 0.25);
`;
