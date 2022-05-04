import styled from 'styled-components';

export const Table = styled.table`
  th,
  td {
    padding: 0.2rem 1rem;
  }
`;

export const ScrollWrapper = styled.div`
  width: 100vw;
  overflow-x: scroll;
  overflow-y: scroll;
  padding: 3rem;
  border-top: ${({ theme, isHidden }) =>
    isHidden ? `none` : `1px solid ${theme.colors.decors.white}`};
`;

export const DispoWrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  z-index: 5000;
  left: ${({ isLeft }) => (isLeft ? '0' : 'unset')};
  right: ${({ isLeft }) => (!isLeft ? '0' : 'unset')};
  top: 160px;
  height: calc(100vh - 180px);
  border-radius: 20px;
  width: fit-content;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: 0 0 24px 2px rgba(12, 12, 12, 1);
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

export const HideNavButton = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  z-index: 5500;
  top: ${({ isHidden }) => (isHidden ? '60px' : '100px')};
  left: ${({ isHidden }) => (isHidden ? '50%' : '25%')};
  transform: translateX(-50%);
  border: none;
  border-radius: ${({ isHidden }) => (isHidden ? '0 0 15px 15px' : '15px')};
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  cursor: pointer;
`;
