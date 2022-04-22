import styled from 'styled-components';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';

export const Wrapper = styled.div`
  width: 100%;
`;

export const StyledCardTemplate = styled(CardTemplate)`
  width: 50vw;
  max-height: 80vh;
  overflow-y: scroll;
`;

export const RestUpdates = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

export const StyledSubTitle = styled(CardSubtitle)`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.black};
  width: 100%;
  margin-bottom: 1rem;
  text-align: left;
`;

export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.black};
  width: 100%;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.decors.grey};
  margin-bottom: 1rem;
`;
