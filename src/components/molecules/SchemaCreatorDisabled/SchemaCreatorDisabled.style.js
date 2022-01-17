import styled from 'styled-components';
import { InterfaceWindowTemplate } from 'components/templates/InterfaceWindowTemplate/InterfaceWindowTemplate';
import { InterfaceWindowSubTitle } from 'components/atoms/InterfaceWindowSubTitle/InterfaceWindowSubTitle';

export const StyledWindow = styled(InterfaceWindowTemplate)`
  margin-top: 2.5rem;
`;

export const StyledSubTitle = styled(InterfaceWindowSubTitle)`
  width: 60%;
  text-align: center;
`;
