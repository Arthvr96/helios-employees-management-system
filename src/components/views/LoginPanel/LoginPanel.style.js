import styled from 'styled-components';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';

export const StyledTitle = styled(CardTitle)`
  color: ${({ theme }) => theme.colors.text.grey};
`;

export const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
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
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.grey};
`;

export const StyledSubTitle = styled(CardSubtitle)`
  max-width: 35rem;
`;
