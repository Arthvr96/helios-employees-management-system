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
