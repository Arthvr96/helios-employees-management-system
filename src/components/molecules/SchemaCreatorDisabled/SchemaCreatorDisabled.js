import React from 'react';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { StyledWindow, StyledSubTitle } from './SchemaCreatorDisabled.style';

const SchemaCreatorDisabled = () => {
  return (
    <StyledWindow>
      <CardTitle>Wybor szablonu</CardTitle>
      <StyledSubTitle>Rozpocznij nowy okres aby odblokowac opcje</StyledSubTitle>
    </StyledWindow>
  );
};

export default SchemaCreatorDisabled;
