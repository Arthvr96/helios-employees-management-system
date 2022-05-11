import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  align-items: center;
  cursor: pointer;

  div {
    margin: ${({ margin }) => margin};
  }
`;
