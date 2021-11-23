import styled from 'styled-components';

export const SchemaGraphDayContentWrapper = styled.div`
  width: 133rem;
  background-color: #f3f3f3;
  height: ${({ isVisible }) => (isVisible ? '80vh' : '0px')};
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  transition: height 0.3s ease-in-out;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  transition: opacity 0.2s 0.2s ease-in;
`;

export const DecorateLine = styled.div`
  width: 1px;
  height: 90%;
  background-color: ${({ theme }) => theme.colors.black};
  margin: 0 1.5rem;
`;
