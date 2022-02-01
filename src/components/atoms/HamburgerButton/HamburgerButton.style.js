import styled, { css } from 'styled-components';

const mixinHamburger = css`
  position: absolute;
  left: 0;
  content: '';
  width: 100%;
  height: 100%;
  background-color: white;
  transition: transform 0.1s ease-in;
`;

export const Button = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 0;

  div {
    position: relative;
    height: 2px;
    width: 23px;
    background: ${({ isOpen, theme }) => (isOpen ? 'transparent' : theme.colors.decors.white)};
    transition: background-color 0.2s ease-in;
  }

  div::before {
    ${mixinHamburger};
    top: ${({ isOpen }) => (isOpen ? '0px' : '-6px')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0deg)')};
  }
  div::after {
    ${mixinHamburger};
    top: ${({ isOpen }) => (isOpen ? '0px' : '6px')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0deg)')};
  }
`;
