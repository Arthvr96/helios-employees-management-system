import styled from 'styled-components';

export const Wrapper = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 6rem);
  margin-right: 3rem;
  padding: 2rem 0;
  transition: ${({ runAnimation }) => (runAnimation ? 'opacity 0.3s ease-in' : 'unset')};
`;
