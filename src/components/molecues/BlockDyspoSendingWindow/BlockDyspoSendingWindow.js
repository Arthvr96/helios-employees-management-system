import React, { useState } from 'react';
import PopupComfirm from 'components/molecues/PopupComfirm/PopupComfirm';
import { InterfaceWindowTemplate } from 'components/templates/InterfaceWindowTemplate/InterfaceWindowTemplate';
import { InterfaceWindowTitle } from 'components/atoms/InterfaceWindowTitle/InterfaceWindowTitle';
import { InterfaceWindowSubTitle } from 'components/atoms/InterfaceWindowSubTitle/InterfaceWindowSubTitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';

const TITLEPOPUP = 'Czy napewno chcesz zablokować wysyłanie dyspozycji?';

const BlockDyspoSendingWindow = () => {
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
        <InterfaceWindowTitle>Wysyłanie dyspozycji aktywne !</InterfaceWindowTitle>
        <InterfaceWindowSubTitle>
          Wybrany okres to : dd-mm-rrrr - dd-mm-rrrr
        </InterfaceWindowSubTitle>
        <SubmitButton isDangerous onClick={toggleVisible}>
          Zablokuj wysyłanie dyspo
        </SubmitButton>
      </InterfaceWindowTemplate>
    </>
  );
};

export default BlockDyspoSendingWindow;
