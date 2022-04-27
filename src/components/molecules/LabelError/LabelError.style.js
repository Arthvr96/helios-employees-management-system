import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  align-items: center;

  div {
    margin: ${({ margin }) => margin};
  }
`;
