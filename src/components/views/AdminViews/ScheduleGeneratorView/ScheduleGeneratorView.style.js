import styled from 'styled-components';

export const ScrollWrapper = styled.div`
  width: 100vw;
  overflow-x: scroll;
  overflow-y: scroll;
  padding: 1rem 5rem;
`;

export const DispoWrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  z-index: 5000;
  left: ${({ isLeft }) => (isLeft ? '0' : 'unset')};
  right: ${({ isLeft }) => (!isLeft ? '0' : 'unset')};
  top: 160px;
  height: 70vh;
  width: fit-content;
  overflow-y: scroll;
  overflow-x: hidden;
  transform: ${({ isOpen, isLeft }) => {
    if (isOpen) {
      return 'translateX(0)';
    }
    if (!isOpen && isLeft) {
      return 'translateX(-100%)';
    }
    if (!isOpen && !isLeft) {
      return 'translateX(100%)';
    }
    return null;
  }};
  transition: transform 0.3s ease-in;
`;

export const StyledButton = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  z-index: 5500;
  top: 100px;
  left: ${({ isLeft }) => (isLeft ? '0' : 'unset')};
  right: ${({ isLeft }) => (!isLeft ? '0' : 'unset')};
  border: none;
  border-radius: ${({ isLeft }) => (isLeft ? '0 15px 15px 0' : '15px 0px 0 15px')};
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  cursor: pointer;
`;
