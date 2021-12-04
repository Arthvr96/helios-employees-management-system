import React from 'react';
import { InterfaceWindowTemplate } from 'components/templates/InterfaceWindowTemplate/InterfaceWindowTemplate';
import { InterfaceWindowTitle } from 'components/atoms/InterfaceWindowTitle/InterfaceWindowTitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import { StyledSubTitle } from './DyspoSendBlockedWindow.style';

const DyspoSendBlockedWindow = () => {
  return (
    <InterfaceWindowTemplate>
      <InterfaceWindowTitle>Wysyłanie dyspozycji zablokowane !</InterfaceWindowTitle>
      <StyledSubTitle>
        Wysyłanie dyspozycji zostało zablokowane, dodaj szablon grafiku aby móc wygenerować grafik
      </StyledSubTitle>
      <SubmitButton isDangerous>Zakończ okres</SubmitButton>
    </InterfaceWindowTemplate>
  );
};

export default DyspoSendBlockedWindow;
