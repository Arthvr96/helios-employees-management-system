import React, { useEffect, useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import LoginPanelForm from 'components/organisms/LoginPanelForm/LoginPanelForm';
import PopupInfo from 'components/molecules/PopupInfo/PopupInfo';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { StyledTitle, Version, Copyrights, Wrapper } from './LoginPanel.style';

const LoginView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isResetPassword, setResetPassword] = useState(false);
  const { authAdmin, authUser, handleLogOut } = useGlobalState();
  const { version } = HeliosAppSdk.appInfo;

  const handleChangePage = () => {
    setResetPassword(!isResetPassword);
  };

  const handleConfirm = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (authAdmin || authUser) {
      handleLogOut();
    }
  }, []);

  return (
    <ViewTemplate navMargin="0" alignItems="center">
      <CardTemplate>
        <Wrapper>
          <StyledTitle>{isResetPassword ? 'Zresetuj hasło' : 'Logowanie'}</StyledTitle>
          <LoginPanelForm isResetPassword={isResetPassword} handleChangePage={handleChangePage} />
          <Version>{`v${version}`}</Version>
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
