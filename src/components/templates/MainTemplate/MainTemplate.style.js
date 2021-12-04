import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: ${window.innerHeight}px;
  background-color: ${({ theme }) => theme.colors.bg.primary};
`;
