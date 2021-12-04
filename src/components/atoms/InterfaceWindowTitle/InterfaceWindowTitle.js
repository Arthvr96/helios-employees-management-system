import styled from 'styled-components';

export const InterfaceWindowTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.black};
  text-align: center;
`;
