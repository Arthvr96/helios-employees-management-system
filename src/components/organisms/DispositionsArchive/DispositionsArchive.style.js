import styled from 'styled-components';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';

export const WrapperWindows = styled.div`
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
`;

export const StyledCardTitle = styled(CardTitle)`
  span {
    text-transform: capitalize;
  }
`;
