import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  align-items: ${({ alignItems }) => alignItems};
  width: ${({ widthSize }) => widthSize && `${widthSize}px`};
  overflow-x: ${({ widthSize }) => (widthSize ? 'scroll' : 'visible')};
  min-width: ${({ minWidth }) => minWidth};
  height: ${({ heightSize, navMargin }) =>
    navMargin ? heightSize - navMargin : heightSize - 65}px;
  padding: ${({ padding }) => padding || '2.5rem 5rem'};
  overflow: ${({ overflow }) => overflow && overflow};
`;
