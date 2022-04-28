import styled from 'styled-components';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';

export const StyledCard = styled(CardTemplate)`
  padding: 0 0 2rem 0;
`;

export const WrapperButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};
`;

export const StyledList = styled.ol`
  column-count: 2;
  li {
    margin-bottom: 1.5rem;

    span {
      padding: 0.5rem;
      background-color: ${({ theme }) => theme.colors.bg.primary};
      font-weight: ${({ theme }) => theme.fontWeight.regular};
      color: ${({ theme }) => theme.colors.text.white};
      border-radius: 5px;
    }
  }
`;

export const Separator = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.darkGrey};
  text-indent: -2rem;
  margin-bottom: 1rem;
`;
