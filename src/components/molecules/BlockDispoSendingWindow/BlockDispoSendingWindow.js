import React, { useState } from 'react';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import PopupConfirm from 'components/molecules/PopupConfirm/PopupConfirm';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';

const TITLEPOPUP = 'Czy napewno chcesz zablokować wysyłanie dyspozycji?';

const BlockDispoSendingWindow = () => {
  const { appState, handleSetAppState } = useAuth();
  const [isVisible, setVisible] = useState(false);

  const handleConfirm = () => {
    toggleVisible();
    handleSetAppState('blockCycle');
  };

  const toggleVisible = () => {
    setVisible(!isVisible);
  };
  return (
    <>
      <PopupConfirm
        title={TITLEPOPUP}
        isVisible={isVisible}
        handleConfirm={handleConfirm}
        handleCancel={toggleVisible}
      />
      <CardTemplate>
        <CardTitle>Wysyłanie dyspozycji aktywne !</CardTitle>
        <CardSubtitle>{`Wybrany okres to : ${appState.date1} - ${appState.date2}`}</CardSubtitle>
        <SubmitButton isDangerous onClick={toggleVisible}>
          Zablokuj wysyłanie dyspo
        </SubmitButton>
      </CardTemplate>
    </>
  );
};

export default BlockDispoSendingWindow;
