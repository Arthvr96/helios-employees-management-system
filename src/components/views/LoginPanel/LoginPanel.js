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
    <Switch>
      <Route exact path="/signin">
        <ViewTemplate navMarginDisabled alignItems="center">
          <CardTemplate>
            <StyledTitle>{isResetPassword ? 'Zresetuj hasło' : 'Logowanie'}</StyledTitle>
            <LoginPanelForm isResetPassword={isResetPassword} handleChangePage={handleChangePage} />
          </CardTemplate>
        </ViewTemplate>
      </Route>
      <Route path="*">
        <Redirect to="/signin" />
      </Route>
    </Switch>
  );
};

export default LoginPanel;
