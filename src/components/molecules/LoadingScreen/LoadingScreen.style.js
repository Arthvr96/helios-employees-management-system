import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ isVisible }) => (isVisible ? '10000' : '-500')};
  display: flex;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  justify-content: center;
  align-items: center;
  width: ${({ widthSize }) => widthSize}px;
  height: ${({ heightSize }) => heightSize}px;
  background: rgb(0, 0, 0);
  background: radial-gradient(circle, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%);
  transition: opacity 0.3s ease-in-out;
`;
