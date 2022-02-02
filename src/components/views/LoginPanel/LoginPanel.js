import React, { useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import LoginPanelForm from 'components/organisms/LoginPanelForm/LoginPanelForm';
import { StyledTitle, Version, Copyrights } from './LoginPanel.style';

const LoginPanel = () => {
  const [isResetPassword, setResetPassword] = useState(false);

  const handleChangePage = () => {
    setResetPassword(!isResetPassword);
  };

  return (
    <ViewTemplate navMargin="0" alignItems="center">
      <CardTemplate>
        <StyledTitle>{isResetPassword ? 'Zresetuj hasło' : 'Logowanie'}</StyledTitle>
        <LoginPanelForm isResetPassword={isResetPassword} handleChangePage={handleChangePage} />
        <Version>v0.3</Version>
      </CardTemplate>
      <Copyrights>
        © All rights reserved | <span>Created by Artur Chmielewski</span>
      </Copyrights>
    </ViewTemplate>
  );
};

export default LoginPanel;
