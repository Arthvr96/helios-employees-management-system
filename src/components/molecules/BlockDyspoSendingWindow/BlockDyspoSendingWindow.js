import React, { useContext, useState } from 'react';
import PopupConfirm from 'components/molecules/PopupConfirm/PopupConfirm';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
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
      <PopupConfirm
        title={TITLEPOPUP}
        isVisible={isVisible}
        handleComfirm={handleComfirm}
        handleCancel={toggleVisible}
      />
      <CardTemplate>
        <CardTitle>Wysyłanie dyspozycji aktywne !</CardTitle>
        <CardSubtitle>Wybrany okres to : dd-mm-rrrr - dd-mm-rrrr</CardSubtitle>
        <SubmitButton isDangerous onClick={toggleVisible}>
          Zablokuj wysyłanie dyspo
        </SubmitButton>
      </CardTemplate>
    </>
  );
};

export default BlockDyspoSendingWindow;
