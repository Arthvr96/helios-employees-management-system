import styled from 'styled-components';

export const GraphTh = styled.th`
  text-align: center;
  background-color: ${({ theme, isDark }) => isDark && theme.colors.bg.tableGrey};
  font-size: ${({ theme, size }) => theme.fontSize[size]};
`;
