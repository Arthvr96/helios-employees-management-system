import styled from 'styled-components';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';

export const StyledTitle = styled(CardTitle)`
  margin: 2rem 0 0 0;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.darkGrey};
`;
