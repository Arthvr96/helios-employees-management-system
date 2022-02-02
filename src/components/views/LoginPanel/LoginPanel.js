import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import LoginPanelForm from 'components/organisms/LoginPanelForm/LoginPanelForm';
import { StyledTitle } from './LoginPanel.style';

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
      </CardTemplate>
    </ViewTemplate>
  );
};

export default LoginPanel;
