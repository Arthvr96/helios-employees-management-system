import React, { useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import LoginPanelForm from 'components/organisms/LoginPanelForm/LoginPanelForm';
import PopupInfo from 'components/molecules/PopupInfo/PopupInfo';
import { StyledTitle, Version, Copyrights, Wrapper } from './LoginPanel.style';

const LoginView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isResetPassword, setResetPassword] = useState(false);

  const handleChangePage = () => {
    setResetPassword(!isResetPassword);
  };

  const handleConfirm = () => {
    setIsVisible(false);
  };

  return (
    <ViewTemplate navMargin="0" alignItems="center">
      <CardTemplate>
        <Wrapper>
          <StyledTitle>{isResetPassword ? 'Zresetuj hasło' : 'Logowanie'}</StyledTitle>
          <LoginPanelForm isResetPassword={isResetPassword} handleChangePage={handleChangePage} />
          <Version>v0.1</Version>
        </Wrapper>
      </CardTemplate>
      <Copyrights>
        © All rights reserved | <span>Created by Artur Chmielewski</span>
      </Copyrights>
      <PopupInfo
        isVisible={isVisible}
        handleConfirm={handleConfirm}
        title="Dane zostały wysłane"
        subtitle="W przyszłosci za pomocą maila będziesz logować sie do systemu, wczesniej będzie trzeba zresetować hasło"
      />
    </ViewTemplate>
  );
};

export default LoginView;
