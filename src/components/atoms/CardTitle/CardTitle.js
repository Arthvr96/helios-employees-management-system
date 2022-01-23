import styled from 'styled-components';

export const CardTitle = styled.h3`
  font-size: ${({ theme, fontSize = 'l' }) => theme.fontSize[fontSize]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.black};
  text-align: center;
`;
