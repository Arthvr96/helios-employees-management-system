import styled from 'styled-components';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';

export const StyledCardTemplate = styled(CardTemplate)`
  padding: 1rem 5rem;
`;

export const StyledTitle = styled(CardTitle)`
  padding: 1rem 0 2rem 0;
`;

export const Name = styled(CardSubtitle)`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.black};
  text-transform: capitalize;
  margin-bottom: 2rem;
`;

export const ListValues = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.grey};
  }

  li:last-child {
    align-self: center;
  }
`;

export const Span = styled.span`
  margin: 0.5rem 0 1rem 0;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.black};
  text-transform: ${({ isCapitalize }) => (isCapitalize ? 'capitalize' : 'none')};
`;

export const WrapperButtons = styled.div`
  display: flex;
  margin: 2rem 0 1rem;
`;
