import styled from 'styled-components';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';

export const StyledWindow = styled(CardTemplate)`
  margin-top: 2.5rem;
`;

export const StyledSubTitle = styled(CardSubtitle)`
  color: ${({ theme }) => theme.colors.black};
  &.secondSub {
    font-size: ${({ theme }) => theme.fontSize.m};
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
  span {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

export const ActiveSchema = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-radius: 15px;
  padding: 1.3rem 2.6rem;
  margin-top: 2rem;
`;

export const SelectedSchema = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  min-height: 5.6rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.darkGrey};
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: 15px;
  color: ${({ theme }) => theme.colors.text.black};
`;

export const WrapperButtons = styled.div`
  margin: 1.5rem;
`;
