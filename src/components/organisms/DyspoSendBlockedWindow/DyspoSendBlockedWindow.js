import React, { useState } from 'react';
import PopupComfirm from 'components/molecues/PopupComfirm/PopupComfirm';
import { InterfaceWindowTemplate } from 'components/templates/InterfaceWindowTemplate/InterfaceWindowTemplate';
import { InterfaceWindowTitle } from 'components/atoms/InterfaceWindowTitle/InterfaceWindowTitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import { StyledSubTitle } from './DyspoSendBlockedWindow.style';

const TITLEPOPUP = 'Czy napewno chcesz zakończy boecny okres dla grafiku?';

const DyspoSendBlockedWindow = () => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!isVisible);
  };
  return (
    <>
      <PopupComfirm
        title={TITLEPOPUP}
        isVisible={isVisible}
        handleComfirm={toggleVisible}
        handleCancel={toggleVisible}
      />
      <InterfaceWindowTemplate>
        <InterfaceWindowTitle>Wysyłanie dyspozycji zablokowane !</InterfaceWindowTitle>
        <StyledSubTitle>
          Wysyłanie dyspozycji zostało zablokowane, dodaj szablon grafiku aby móc wygenerować grafik
        </StyledSubTitle>
        <SubmitButton isDangerous onClick={toggleVisible}>
          Zakończ okres
        </SubmitButton>
      </InterfaceWindowTemplate>
    </>
  );
};

export default DyspoSendBlockedWindow;
