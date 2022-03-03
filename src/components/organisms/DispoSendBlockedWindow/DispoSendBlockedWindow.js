import React, { useState } from 'react';
import PopupConfirm from 'components/molecules/PopupConfirm/PopupConfirm';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import {
  StyledSubTitle,
  StyledCardTemplate,
} from 'components/organisms/DispoSendBlockedWindow/DispoSendBlockedWindow.style';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';

const TITLEPOPUP = 'Czy napewno chcesz zakończy boecny okres dla grafiku?';

const DispoSendBlockedWindow = () => {
  const { handleChangeStateApp } = useGlobalState();
  const [isVisible, setVisible] = useState(false);

  const handleConfirm = () => {
    toggleVisible();
    handleChangeStateApp('endCycle');
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
      <StyledCardTemplate>
        <CardTitle>Wysyłanie dyspozycji zablokowane !</CardTitle>
        <StyledSubTitle>
          Wysyłanie dyspozycji zostało zablokowane, dodaj szablon grafiku aby móc wygenerować grafik
        </StyledSubTitle>
        <SubmitButton onClick={() => handleChangeStateApp('backToActive')}>
          Odblokuj wysyłanie dyspozycji
        </SubmitButton>
        <SubmitButton isDangerous onClick={toggleVisible}>
          Zakończ okres
        </SubmitButton>
      </StyledCardTemplate>
    </>
  );
};

export default DispoSendBlockedWindow;
