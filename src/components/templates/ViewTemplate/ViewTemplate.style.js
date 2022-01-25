import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  align-items: ${({ alignItems }) => alignItems};
  width: 100vw;
  height: ${({ heightSize, navMarginDisabled }) =>
    navMarginDisabled ? heightSize : heightSize - 65}px;
  padding: 2.5rem 5rem;
`;
