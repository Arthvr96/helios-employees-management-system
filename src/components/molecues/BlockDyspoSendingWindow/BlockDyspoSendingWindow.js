import React from 'react';
import { InterfaceWindowTemplate } from 'components/templates/InterfaceWindowTemplate/InterfaceWindowTemplate';
import { InterfaceWindowTitle } from 'components/atoms/InterfaceWindowTitle/InterfaceWindowTitle';
import { InterfaceWindowSubTitle } from 'components/atoms/InterfaceWindowSubTitle/InterfaceWindowSubTitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';

const BlockDyspoSendingWindow = () => {
  return (
    <InterfaceWindowTemplate>
      <InterfaceWindowTitle>Wysyłanie dyspozycji aktywne !</InterfaceWindowTitle>
      <InterfaceWindowSubTitle>Wybrany okres to : dd-mm-rrrr - dd-mm-rrrr</InterfaceWindowSubTitle>
      <SubmitButton customMargin="1.8rem" isDangerous>
        Zablokuj wysyłanie dyspo
      </SubmitButton>
    </InterfaceWindowTemplate>
  );
};

export default BlockDyspoSendingWindow;
