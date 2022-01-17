import styled from 'styled-components';
import { ViewTemplate } from 'components/templates/ViewTemplate/ViewTemplate';

export const StyledViewTemplate = styled(ViewTemplate)`
  height: ${({ heightSize }) => heightSize}px;
  justify-content: center;
  align-items: center;
`;
