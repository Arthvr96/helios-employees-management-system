import React from 'react';
import { InterfaceWindowTitle } from 'components/atoms/InterfaceWindowTitle/InterfaceWindowTitle';
import { StyledWindow, StyledSubTitle } from './SchemaCreatorDisabled.style';

const SchemaCreatorDisabled = () => {
  return (
    <StyledWindow>
      <InterfaceWindowTitle>Wybor szablonu</InterfaceWindowTitle>
      <StyledSubTitle>Rozpocznij nowy okres aby odblokowac opcje</StyledSubTitle>
    </StyledWindow>
  );
};

export default SchemaCreatorDisabled;
