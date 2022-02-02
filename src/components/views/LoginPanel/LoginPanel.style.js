import styled from 'styled-components';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';

export const StyledTitle = styled(CardTitle)`
  color: ${({ theme }) => theme.colors.text.grey};
`;

export const Copyrights = styled.div`
  position: absolute;
  bottom: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.grey};

  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Version = styled.div`
  position: absolute;
  bottom: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.grey};
`;
