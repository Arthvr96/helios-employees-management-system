import styled from 'styled-components';

export const CardSubtitle = styled.h4`
  margin: ${({ margin }) => margin || '1rem 0 0 0'};
  font-size: ${({ theme, fontSize }) => (fontSize ? theme.fontSize[fontSize] : theme.fontSize.xs)};
  font-weight: ${({ theme, fontWeight }) =>
    fontWeight ? theme.fontWeight[fontWeight] : theme.fontWeight.light};
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.text.grey};
  text-align: center;
`;
