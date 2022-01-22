import React, { useContext, useState } from 'react';
import PopupComfirm from 'components/molecules/PopupComfirm/PopupComfirm';
import { InterfaceWindowTemplate } from 'components/templates/InterfaceWindowTemplate/InterfaceWindowTemplate';
import { InterfaceWindowTitle } from 'components/atoms/InterfaceWindowTitle/InterfaceWindowTitle';
import { InterfaceWindowSubTitle } from 'components/atoms/InterfaceWindowSubTitle/InterfaceWindowSubTitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import { AdminStateContext } from 'providers/AdminStateProvider/AdminStateProvider';

const TITLEPOPUP = 'Czy napewno chcesz zablokować wysyłanie dyspozycji?';

const BlockDyspoSendingWindow = () => {
  const { changeCycle } = useContext(AdminStateContext);
  const [isVisible, setVisible] = useState(false);

  const handleComfirm = () => {
    toggleVisible();
    changeCycle('blocked');
  };

  const toggleVisible = () => {
    setVisible(!isVisible);
  };
  return (
    <>
      <PopupComfirm
        title={TITLEPOPUP}
        isVisible={isVisible}
        handleComfirm={handleComfirm}
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
