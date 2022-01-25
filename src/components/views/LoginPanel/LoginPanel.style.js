import styled from 'styled-components';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';

export const StyledTitle = styled(CardTitle)`
  color: ${({ theme }) => theme.colors.text.grey};
`;
