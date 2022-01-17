import styled from 'styled-components';
import { InterfaceWindowTemplate } from 'components/templates/InterfaceWindowTemplate/InterfaceWindowTemplate';

export const StyledWindow = styled(InterfaceWindowTemplate)`
  margin-top: 2.5rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  select {
    margin-top: 1rem;
    text-align: center;
  }
`;
