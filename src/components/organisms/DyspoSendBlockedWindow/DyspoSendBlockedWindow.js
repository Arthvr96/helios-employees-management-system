import React, { useContext, useState } from 'react';
import PopupComfirm from 'components/molecules/PopupComfirm/PopupComfirm';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import { AdminStateContext } from 'providers/AdminStateProvider/AdminStateProvider';
import { StyledSubTitle } from './DyspoSendBlockedWindow.style';

const TITLEPOPUP = 'Czy napewno chcesz zakończy boecny okres dla grafiku?';

const DyspoSendBlockedWindow = () => {
  const { changeCycle } = useContext(AdminStateContext);
  const [isVisible, setVisible] = useState(false);

  const handleComfirm = () => {
    toggleVisible();
    changeCycle('new');
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
      <CardTemplate>
        <CardTitle>Wysyłanie dyspozycji zablokowane !</CardTitle>
        <StyledSubTitle>
          Wysyłanie dyspozycji zostało zablokowane, dodaj szablon grafiku aby móc wygenerować grafik
        </StyledSubTitle>
        <SubmitButton isDangerous onClick={toggleVisible}>
          Zakończ okres
        </SubmitButton>
      </CardTemplate>
    </>
  );
};

export default DyspoSendBlockedWindow;
