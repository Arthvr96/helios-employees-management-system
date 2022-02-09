import styled from 'styled-components';

export const CardSubtitle = styled.h4`
  margin-top: 1rem;
  font-size: ${({ theme, fontSize }) => (fontSize ? theme.fontSize[fontSize] : theme.fontSize.xs)};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.text.grey};
  text-align: center;
`;
